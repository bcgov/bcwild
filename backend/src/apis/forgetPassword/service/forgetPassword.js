const { dataExist, customUpdate } = require("../../../helpers/commonSequelizeQueries");
const User = require("../../user/model/user");
const { sequelize } = require("../../../config/database");
const { resetMail } = require("../../../helpers/send-email");
const { BadRequestError, NotFoundError } = require("../../../errorHandler/customErrorHandlers");
const {customErrors}=require("../../../errorHandler/error");
const jwtDecode = require("jwt-decode");
const { signToken } = require("../../../helpers/auth");
const { generateHash } = require("../../../helpers/passwordHash");
const forgetPassword = async (req) => {
    let transaction;
    try {

        let { email } = req.body;

        if (!email) {
            throw new BadRequestError("Email is missing");
        }

        //checking registered user
        const userData = await dataExist(User, { email: email });
        if (!userData) throw new NotFoundError("User is not found")

        //Setting ResetKey
        let key = signToken({ id: userData.id, email: email });
        let resetKey = key.refreshToken;

        //Initiate transaction
        transaction = await sequelize.transaction()
        const updateUser = await customUpdate(User, { email: email }, { password_reset_key: resetKey }, transaction);
        const { first_name, last_name } = updateUser
        await resetMail(email, first_name + " " + last_name, resetKey)
        await transaction.commit();
        return updateUser
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        customErrors(error.name, error.message)
    }

}

const resetPassword = async (req) => {
    let transaction;
    try {

        const { resetKey } = req.query;
        let { password } = req.body;

        if (!password || !resetKey) {
            throw new BadRequestError("Enter required fields");
        }

        const decodedId = jwtDecode(resetKey);
        let id = decodedId.data.id;

        const hashPassword = await generateHash(password)
        //Initiate transaction
        transaction = await sequelize.transaction()
        const data = await customUpdate(User, { id: id, password_reset_key: resetKey }, { password: hashPassword, password_reset_key: null });
        await transaction.commit()
        return data;

    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        customErrors(error.name, error.message)
    }

};

module.exports = {
    forgetPassword,
    resetPassword
}