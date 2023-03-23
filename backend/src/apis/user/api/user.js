const services = require("../service/user")
const registration = async(req)=>{
    return await services.registration(req)
}

const login = async(req)=>{
    return await services.login(req)
}

const generateAccessToken = async(req)=>{
    return await services.generateAccessToken(req)
}

module.exports = {
    registration,
    login,
    generateAccessToken
}