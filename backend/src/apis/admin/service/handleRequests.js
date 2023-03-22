const { UnauthorizedError, BadRequestError } = require("../../../errorHandler/customErrorHandlers");
const { customErrors } = require("../../../errorHandler/error");
const { customFindAll, customUpdate } = require("../../../helpers/commonSequelizeQueries");
const { signupApprovalMail } = require("../../../helpers/send-email");
const User = require("../../user/model/user");
const { signupRequestValidation } = require("../validation/admin");
const { sequelize } = require("../../../config/database");
const signupRequestsHandler = async(req)=>{
    let transaction;
    try{
        const {id,status} = req.body;
        if(req.decoded.role!="admin") throw new UnauthorizedError("Unauthorized access")

        //validation
        const {error} = signupRequestValidation(req.body)
        if(error) throw new BadRequestError(error.message)

        transaction = await sequelize.transaction()
        const requestData = await customUpdate(User,{id:id},{status:status})
        const {email,first_name,last_name} = requestData
        //sending mail
        await signupApprovalMail(email,first_name+" "+last_name,status)
        await transaction.commit()

        return req.body
    }catch(error){
        if (transaction) {
            await transaction.rollback();
        }
        customErrors(error.name, error.message)
    }

}

const showSignupRequests = async(req)=>{    
    const {page,page_size} = req.query;

    if(req.decoded.role!="admin") throw new UnauthorizedError("Unauthorized access")
    const signUpRequestsData = await customFindAll(User,{status:"pending",role:"user"},null,page,page_size,["id","first_name","last_name","username","email"])

    return signUpRequestsData
}

module.exports = {
    showSignupRequests,
    signupRequestsHandler
}