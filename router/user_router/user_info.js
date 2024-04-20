const express=require("express")
const router=express.Router()
const userModelController=require("../../controller/user_controller/user_info")
router.post("/createuser",userModelController.createUser)
router.get("/getuser",userModelController.getUser)
router.get("/getuserby/:id",userModelController.getUserById)
router.delete("/deleteuserby/:id",userModelController.deleteUser)
router.patch("/updateuserby/:id",userModelController.userUpdate)

module.exports=router;