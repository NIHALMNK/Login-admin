const express=require('express')
const router=express.Router();
const adminController =require('../Controller/adminController')
const adminauth=require("../middleware/adminauth")


//=============================>
router.get('/login',adminauth.isLogin,adminController.loadLogin)
router.post('/login',adminController.login)
router.get('/home',adminauth.checkSession,adminController.loadHome)
router.post('/edit-User',adminauth.checkSession,adminController.editUser)
router.get('/delete-User/:id',adminauth.checkSession,adminController.deleteUser)
router.post('/user',adminauth.checkSession,adminController.addUser)
router.get('/logout',adminauth.checkSession,adminController.logOut)
router.get('/search-user', adminauth.checkSession, adminController.searchUser);




module.exports=router;