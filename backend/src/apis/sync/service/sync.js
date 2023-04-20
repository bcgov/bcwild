const { customCreate, customDelete, customUpdate } = require("../sequelizeQuery/sync")
const Telemetry = require('../models/telemetry')
const CameraTrapData = require('../models/camera')
const { customFindAll } = require("../../../helpers/commonSequelizeQueries")
const { Op } = require('sequelize')
const { customErrors } = require("../../../errorHandler/error")
const { sequelize } = require("../../../config/database");
const pushChanges = async (req) => {
    let transaction;
    try {

        const { username } = req.decoded

        transaction = await sequelize.transaction()

        for (let data of req.body) {

            const model = data.record_identifier.startsWith("TELE") ? Telemetry : CameraTrapData;
            data.data.created_by = username
            data.data.record_identifier = data.record_identifier
            await customCreate(model, data.data, { transaction: transaction },{record_identifier:data.record_identifier})

        }

        await transaction.commit();
        return true
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        customErrors(error.name, error.message)
    }

}
const pullChanges = async (req) => {
    let { lastPulledAt } = req.body;
<<<<<<< HEAD
    lastPulledAt =new Date(lastPulledAt).toISOString()
    const { username } = req.decoded
    var telemetryData = customFindAll(Telemetry, { project_id: ["Project1","Project2"], updatedAt: { [Op.gt]: lastPulledAt }})
    
    var cameraTrapData = customFindAll(CameraTrapData, { project_id: ["Project1","Project2"], updatedAt: { [Op.gt]: lastPulledAt }})
=======
    lastPulledAt = new Date(lastPulledAt).toISOString()
    const { username } = req.decoded
    var telemetryData = customFindAll(Telemetry, { project_id: ["Project1", "Project2"], updatedAt: { [Op.gt]: lastPulledAt } })

    var cameraTrapData = customFindAll(CameraTrapData, { project_id: ["Project1", "Project2"], updatedAt: { [Op.gt]: lastPulledAt } })
>>>>>>> dda903508a3e360e9fe41f42fa1bc1e1e40d5ca1

    //var bearingData = customFindAll(Bearing, { username: username, updatedAt: { [Op.gt]: lastPulledAt }})

    let result = await Promise.all([telemetryData, cameraTrapData]);
    [telemetryData, cameraTrapData] = result

<<<<<<< HEAD
    return {telemetryData, cameraTrapData}
=======
    return { telemetryData, cameraTrapData }
>>>>>>> dda903508a3e360e9fe41f42fa1bc1e1e40d5ca1
}

module.exports = {
    pushChanges,
    pullChanges
}