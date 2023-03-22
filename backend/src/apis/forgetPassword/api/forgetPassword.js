const services = require("../service/forgetPassword")

const forgetPassword = async(req)=>{
    return await services.forgetPassword(req)
}

const resetPassword = async(req)=>{
    return await services.resetPassword(req)
}

module.exports = {
    forgetPassword,
    resetPassword
}