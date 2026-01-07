const express = require('express')
const userController = require('../controllers/userController')
const { auth } = require('../middlewares/authMiddleware')
const router = express.Router()


router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/getUserInfo", auth, userController.getUserInfo)






module.exports = router