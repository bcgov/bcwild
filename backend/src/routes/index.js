const router = require('express').Router()
router.use('/user',require('./user'))
router.use('/admin',require('./admin'))
router.use('/',require('./forgetPassword'))
module.exports = router