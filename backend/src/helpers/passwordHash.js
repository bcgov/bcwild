const bcrypt = require('bcrypt')
const generateHash = (password)=> {
    return bcrypt.hash(password, bcrypt.genSaltSync(8));
}
const validPassword = (password,hashPassword) =>{
    return bcrypt.compare(password, hashPassword);
}

module.exports = {
    generateHash,
    validPassword
}
