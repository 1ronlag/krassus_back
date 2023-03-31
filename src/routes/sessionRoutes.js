const express = require('express')
const router = express.Router()
const { reportRequest } = require('../middlewares/logger')
const { loginUser } = require('../controllers/sessionController')

router.get('/login', reportRequest, loginUser)

module.exports = router
