const services = require("../service/export")

const exportData = async(req)=>{
    return await services.exportData(req)
}

module.exports = {
    exportData
}