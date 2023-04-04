"use strict";
const User = require("../../user/model/user")
const Sequelize = require("sequelize");
const db = require("../../../config/database");
const Project = require("../../project/model/project")

const CameraTrapData = db.sequelize.define(
    "camera_trap_data",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        project_id: {
            type: Sequelize.STRING(20),
        },
        survey_id: {
            type: Sequelize.STRING(20)
        },
        field_crew: {
            type: Sequelize.STRING(50),
        },
        date_time:{
            type: Sequelize.DATE
        },
        station_id: {
            type: Sequelize.STRING(20),
        },
        deploy_check: {
            type: Sequelize.STRING(20),
        },
        station_northing: {
            type: Sequelize.STRING(100),
        },
        station_easting: {
            type: Sequelize.STRING(100),
        },
        camera_attached: {
            type: Sequelize.BOOLEAN,
        },
        security_box: {
            type: Sequelize.BOOLEAN,
        },
        camera_height: {
            type: Sequelize.INTEGER,
        },
        camera_compass_direction: {
            type: Sequelize.INTEGER,
        },
        camera_id: {
            type: Sequelize.STRING(50),
        },
        camera_make: {
            type: Sequelize.STRING(50),
        },
        camera_model: {
            type: Sequelize.STRING(50),
        },
        sd_card_id: {
            type: Sequelize.STRING(50),
        },
        key_id: {
            type: Sequelize.STRING(50),
        },
        visibility: {
            type: Sequelize.INTEGER,
        },
        habitat_type: {
            type: Sequelize.STRING(50),
        },
        target_feature: {
            type: Sequelize.STRING(50),
        },
        distant_feature: {
            type: Sequelize.INTEGER,
        },
        quiet_period: {
            type: Sequelize.INTEGER,
        },
        trigger_sensitivity: {
            type: Sequelize.STRING(50),
        },
        trigger_timing: {
            type: Sequelize.INTEGER,
        },
        photos_trigger: {
            type: Sequelize.INTEGER,
        },
        bait_lure: {
            type: Sequelize.STRING(50),
        },
        camera_active: {
            type: Sequelize.BOOLEAN,
        },
        comments: {
            type: Sequelize.TEXT,
        },
        camera_damaged: {
            type: Sequelize.TEXT,
        },
        number_of_photos: {
            type: Sequelize.INTEGER,
        },
        battery_percent: {
            type: Sequelize.INTEGER,
        },
        purpose_visit: {
            type: Sequelize.STRING(50),
        },
        camera_removed: {
            type: Sequelize.BOOLEAN,
        },
        camera_replaced: {
            type: Sequelize.BOOLEAN,
        },
        batteries_replaced: {
            type: Sequelize.BOOLEAN,
        },
        sd_card_replaced: {
            type: Sequelize.BOOLEAN,
        },
        photos: {
            type: Sequelize.TEXT,
        },
        created_by:{
            type: Sequelize.STRING(20),
        },
        updated_by:{
            type: Sequelize.STRING(20),
        }
    },
    { timestamps: true,underscored:true }
);


CameraTrapData.belongsTo(Project,{
    foreignKey:"project_id",
    targetKey:"project_id",
    as:"project"
})

// CameraTrapData.belongsTo(User,{
//     foreignKey:"created_by",
//     targetKey:"username",
//     as:"user"
// })
// CameraTrapData.belongsTo(User,{
//     foreignKey:"updated_by",
//     targetKey:"username",
//     as:"user"
// })

module.exports = CameraTrapData;
