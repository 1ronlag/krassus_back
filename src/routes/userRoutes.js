const express = require('express')
const router = express.Router()
const { userRegiter, getProfiles, updateUsertById, deleteUserById} = require('../controllers/usersController')
// const { isLogin} = require ('../middlewares/isLogin')
const { reportRequest } = require('../middlewares/logger')

router.post('/users', reportRequest, userRegiter )
router.get('/users', reportRequest, getProfiles)
router.put('/users/:id', reportRequest, updateUsertById)
router.delete('/users/:id', reportRequest, deleteUserById)


module.exports = router
    
    