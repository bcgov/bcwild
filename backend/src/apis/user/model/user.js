"use strict";

const Sequelize = require("sequelize");
const db = require("../../../config/database");
const bcrypt = require("bcrypt")

const User = db.sequelize.define(
    "user",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        email: {
            type: Sequelize.STRING(50),
            unique: true,
            allowNull: false
        },

        username: {
            type: Sequelize.STRING(50),
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(200),
            allowNull: false,
        },
        first_name: {
            type: Sequelize.STRING(25),
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING(25),
            allowNull: false
        },

        contact_number: {
            type: Sequelize.STRING(20),
            allowNull: false
        },

        role: {
            type: Sequelize.STRING(20),
            allowNull: false,
            defaultValue: "user"
        },
        status: {
            type: Sequelize.ENUM("pending", "approved", "rejected"),
            allowNull: false,
            defaultValue: "pending"
        },
        password_reset_key:{
            type: Sequelize.STRING(500)
        }
    },
    { timestamps: true }
);


User.sync({alter:true}).then();

module.exports = User;
