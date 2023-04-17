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

const updateProfilePhoto = async(req)=>{
    return await services.updateProfilePhoto(req)
}

const userDetails = async(req)=>{
    return await services.userDetails(req)
}

module.exports = {
    registration,
    login,
    generateAccessToken,
    updateProfilePhoto,
    userDetails
}