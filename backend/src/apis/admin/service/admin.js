const { BadRequestError, UnauthorizedError } = require("../../../errorHandler/customErrorHandlers");
const {loginValidation} = require("../validation/admin")
const {validPassword } = require("../../../helpers/passwordHash");
const { dataExist } = require("../../../helpers/commonSequelizeQueries")
const User = require("../../user/model/user");
const { signToken } = require("../../../helpers/auth");

const login = async (req) => {

    let { username, password } = req.body;

    //validation
    const {error} = loginValidation(req.body)

    if(error) throw new BadRequestError(error.message)

    let getLoginData = await dataExist(User, { username: username,role:"admin" })

    if (!getLoginData) throw new UnauthorizedError("You are not admin")

    const validCredentials = await validPassword(password,getLoginData?.password)

    if (validCredentials) {
        const tokens = signToken({ id: getLoginData.id, email: getLoginData.email, username: getLoginData.username,role:getLoginData.role })
        getLoginData = getLoginData.dataValues;
        getLoginData.tokens = tokens
        return getLoginData

    } else {
        throw new UnauthorizedError("Enter valid credentials")
    }
}

module.exports = {
    login
}