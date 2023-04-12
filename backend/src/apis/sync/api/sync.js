const services = require("../service/sync")

const pushChanges = async(req)=>{
    return await services.pushChanges(req)
}

const pullChanges = async(req)=>{
    return await services.pullChanges(req)
}


module.exports = {
    pushChanges,
    pullChanges
}