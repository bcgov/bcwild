const services = require("../service/admin")
const signupRequestServices = require("../service/handleRequests")

const login = async(req)=>{
    return await services.login(req)
}

const handleSignupRequests = async(req)=>{
    return await signupRequestServices.signupRequestsHandler(req)
}

const showSignupAccess = async(req)=>{
    return await signupRequestServices.showSignupRequests(req)
}

module.exports = {
    login,
    handleSignupRequests,
    showSignupAccess
}