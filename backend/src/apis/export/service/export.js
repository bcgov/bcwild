const Telemetry = require('../../sync/models/telemetry')
const CameraTrapData = require('../../sync/models/camera')
const ProjectAccess = require('../../project/model/projectAccess')
const { customFindAll } = require('../../../helpers/commonSequelizeQueries')
let converter = require('json-2-csv');
const fs = require('fs');
const { dataExportMail } = require('../../../helpers/send-email');

const exportData = async (req) => {

    const { email } = req.body

    const { username } = req.decoded

    let projecAccessData = await customFindAll(ProjectAccess, { username: username, status: "approved" }, null, null, null, ["project_id"])
    projecAccessData = projecAccessData.rows.map((value) => { return value.project_id; })

    var telemetryData = customFindAll(Telemetry, { project_id: projecAccessData })

    var cameraTrapData = customFindAll(CameraTrapData, { project_id: projecAccessData })
    let [telemetry, cameraTrap] = await Promise.all([telemetryData, cameraTrapData]);

    const csv = await converter.json2csv({ telemetry: telemetry.rows, cameraTrap: cameraTrap.rows }, { unwindArrays: true });
    fs.writeFileSync('dataExport.csv', csv, 'utf-8')
    const file = fs.readFileSync('dataExport.csv')
    //console.log(file,'----')
    const sendMail = await dataExportMail(email, username, file)

    fs.unlinkSync('dataExport.csv')

    return sendMail
}

module.exports = {
    exportData
}