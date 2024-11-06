const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const auth = require("../middleware/auth")


router.get("/login",auth.isLogin,userController.loadlogin )
router.post("/login",userController.login)
router.get("/register",auth.isLogin,userController.loadRegister )
router.post("/register", userController.registerUser);
router.get("/home", auth.checkSession, userController.loadHome); 
router.get("/logout",auth.checkSession,userController.logout)

module.exports = router;
