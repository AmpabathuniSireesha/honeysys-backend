const express=require("express")
const router=express.Router()
const registerModelController=require("../../controller/register_controller/register_info")
router.post("/register",registerModelController.registerUser)
router.post("/login",registerModelController.loginUser)
router.post("/logout",registerModelController.logoutUser)
module.exports=router; 