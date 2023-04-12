const { customCreate, customDelete, customUpdate } = require("../sequelizeQuery/sync")
const Telemetry = require('../models/telemetry')
const CameraTrapData = require('../models/camera')
const { customFindAll } = require("../../../helpers/commonSequelizeQueries")
const { Op } = require('sequelize')

const pushChanges = async (req) => {

    const { changes } = req.body;
    const { username } = req.decoded
    for (let data of changes) {

        data.table = (data.table=="Telemetry")?Telemetry:CameraTrapData;
        if (data.type == "created") {
            for (let record of data.data) {
                record.created_by = username
                customCreate(data.table, record)
            }
        } else if (data.type == "updated") {
            for (let record of data.data) {
                record.updated_by = username
                customUpdate(data.table,{id:record.id}, record)
            }
        } else {
            for (let record of data.data) {
                customDelete(data.table, { id: record.id })
            }
        }
    }



}
const pullChanges = async (req) => {
    let { lastPulledAt } = req.body;
    lastPulledAt =new Date(lastPulledAt).toISOString()
    const { username } = req.decoded
    var telemetryData = customFindAll(Telemetry, { project_id: ["Project1","Project2"], updatedAt: { [Op.gt]: lastPulledAt }})
    
    var cameraTrapData = customFindAll(CameraTrapData, { project_id: ["Project1","Project2"], updatedAt: { [Op.gt]: lastPulledAt }})

    //var bearingData = customFindAll(Bearing, { username: username, updatedAt: { [Op.gt]: lastPulledAt }})

    let result = await Promise.all([telemetryData, cameraTrapData]);
    [telemetryData, cameraTrapData] = result

    return {telemetryData, cameraTrapData}
}

module.exports = {
    pushChanges,
    pullChanges
}