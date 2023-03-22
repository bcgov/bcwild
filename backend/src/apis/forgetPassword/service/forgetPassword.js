const { dataExist, customUpdate } = require("../../../helpers/commonSequelizeQueries");
const User = require("../../user/model/user");
const { sequelize } = require("../../../config/database");
const { resetMail } = require("../../../helpers/send-email");
const { BadRequestError, NotFoundError } = require("../../../errorHandler/customErrorHandlers");
const jwtDecode = require("jwt-decode");
const forgetPassword = async (req, res) => {
    let transaction;
    try {

        let { email } = req.body;

        if (!email) {
            throw new BadRequestError("Email is missing");
        }

        //checking registered user
        const userData = await dataExist(User, { email: email });
        if(!userData) throw new NotFoundError("User is not found")

        //Setting ResetKey
        let key = signToken({ id: userData.id, email: email });
        let resetKey = key.refreshToken;

        //Initiate transaction
        transaction = await sequelize.transaction()
        const updateUser = await customUpdate(User, { where: where }, { password_reset_key: resetKey },transaction);
        const { first_name, last_name } = updateUser
        await resetMail(email, first_name + " " + last_name, resetKey)
        await transaction.commit()
        return data
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        customErrors(error.name, error.message)
    }

}

const resetPassword = async (req, res) => {

    const {resetKey} = req.query;
    const decodedId = jwtDecode(resetKey);
    let id = decodedId.data.id;
    let { password, type } = req.body;
  
    if (!password) {
      throw new BadRequestError("Enter required fields");
    }

    //checking registered user
    //let user = await customFindOne(modelName, { where: where });
      const data = await customUpdate(
        modelName,
        { where: where,individualHooks:true },
        { password: password,password_reset_key:null }
      );
      return data;
    
  };

module.exports = {
    forgetPassword
}