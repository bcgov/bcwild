"use strict";
const User = require("../../user/model/user")
const Sequelize = require("sequelize");
const db = require("../../../config/database");

const Project = db.sequelize.define(
    "project",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        username: {
            type: Sequelize.STRING(50)
        },
        project_id: {
            type: Sequelize.STRING(50),
            unique: true,
            allowNull: false
        },
        study_area: {
            type: Sequelize.STRING(200),
            allowNull: false,
        },
        survey_id: {
            type: Sequelize.STRING(25),
            allowNull: false
        },
        creation_date:{
            type: Sequelize.STRING(25)
        }
    },
    { timestamps: true }
);


Project.belongsTo(User,{
    foreignKey:"username",
    targetKey:"username",
    as:"user"
})

Project.sync().then()
module.exports = Project;
