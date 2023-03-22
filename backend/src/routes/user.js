const router = require('express').Router()
const userController = require("../apis/user/api/user")
const { successResponse, errorResponse } = require('../helpers/apiResponse')
router.post('/register',registration)
router.post('/login',login)

async function registration(req, res) {
    try {
        const result = await userController.registration(req, res);

        successResponse("Registered successfully", result, res);
    } catch (error) {

        errorResponse(error, res);
    }
}

async function login(req, res) {
    try {
        const result = await userController.login(req, res);

        successResponse("Login successfully", result, res);
    } catch (error) {

        errorResponse(error, res);
    }
}

module.exports = router