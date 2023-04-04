const { registrationValidation, loginValidation } = require("../validation/user")
const { dataExist, customInsert,customFindAll } = require("../../../helpers/commonSequelizeQueries")
const { registerMail } = require("../../../helpers/send-email")
const { sequelize } = require("../../../config/database");
const { customErrors } = require("../../../errorHandler/error");
const User = require("../model/user");
const ProjectAccess = require("../../project/model/projectAccess");
const Project = require("../../project/model/project");
const { AlreadyExistError, UnauthorizedError, NotFoundError, BadRequestError } = require("../../../errorHandler/customErrorHandlers");
const { signToken } = require("../../../helpers/auth");
const { generateHash, validPassword } = require("../../../helpers/passwordHash");
const { Op } = require('sequelize')
const jwtDecode = require("jwt-decode");
const registration = async (req) => {
    let transaction;
    try {
        const { email, username, password, first_name, last_name } = req.body;
        //validation
        const { error } = registrationValidation(req.body)

        if (error) throw new BadRequestError(error.message)

        //existing user
        const isExistData = await dataExist(User, { [Op.or]: [{ email: email }, { username: username }] }, null)


        if (isExistData){
            let message = isExistData.username==username ?"This username is already registered" : "This email is already registered"
            throw new AlreadyExistError(message)
        } 


        const hashPassword = await generateHash(password)
        delete req.body["password"]

        transaction = await sequelize.transaction()
        //Inserting data
        const registerData = await customInsert(User, { ...req.body, password: hashPassword }, { transaction })
        delete registerData.dataValues["password"];
        const fullName = `${first_name} ${last_name}`
        //sending mail
        await registerMail(email, fullName)

        await transaction.commit()
        return registerData
    } catch (error) {

        if (transaction) {
            await transaction.rollback();
        }
        customErrors(error.name, error.message)
    }

}

const adminData = async () => {
    const signUprequest = await customFindAll(User, { status: "pending" });
    const projectRequest = await customFindAll(ProjectAccess, { status: "pending" });
    
    return { signUprequest: signUprequest?.count, projectRequest: projectRequest?.count }
}

const login = async (req) => {

    let { username, password } = req.body;

    //validation
    const { error } = loginValidation(req.body)

    if (error) throw new BadRequestError(error.message)

    let getLoginData = await dataExist(User, { username: username })

    if (getLoginData) {
        if (getLoginData.status == "pending") throw new UnauthorizedError("Your account is not approved yet")
        if (getLoginData.status == "rejected") throw new UnauthorizedError("Your account is rejected")
    } else {
        throw new UnauthorizedError("Invalid username or password")
    }

    const validCredentials = await validPassword(password, getLoginData?.password)

    if (validCredentials) {
        const tokens = signToken({ id: getLoginData.id, email: getLoginData.email, username: getLoginData.username,role:getLoginData.role })
        getLoginData = getLoginData.dataValues;
        delete getLoginData["password"];
        getLoginData.tokens = tokens

        if (getLoginData.role == "admin") {
            const getRequestData = await adminData();
            getLoginData.signUprequests = getRequestData?.signUprequest || 0
            getLoginData.projectRequests = getRequestData?.projectRequest || 0
        }else{
            const projectList = await customFindAll(ProjectAccess,{username:getLoginData.username,status:"approved"},null,null,null,["id","project_id"]);
            getLoginData.projects = projectList?.rows
        }

        return getLoginData

    } else {
        throw new UnauthorizedError("Enter valid credentials")
    }
}



const generateAccessToken = async (req) => {

    const { refreshToken } = req.body;
    let tokenData = jwtDecode(refreshToken);
    tokenData = tokenData.data
    const tokens = signToken({ id: tokenData.id, email: tokenData.email, username: tokenData.username, role: tokenData.role })
    return tokens;
}

module.exports = {
    registration,
    login,
    generateAccessToken
}