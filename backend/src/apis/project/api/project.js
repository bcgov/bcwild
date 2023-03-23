const services = require("../service/project")

const addProject = async(req)=>{
    return await services.addProject(req)
}

const projectList = async(req)=>{
    return await services.projectList(req)
}

const projectRequest = async(req)=>{
    return await services.projectRequest(req)
}

const projectRequestList = async(req)=>{
    return await services.projectRequestList(req)
}

const projectRequestStatusHandler = async(req)=>{
    return await services.projectRequestStatusHandler(req)
}

module.exports = {
    addProject,
    projectList,
    projectRequest,
    projectRequestList,
    projectRequestStatusHandler
}