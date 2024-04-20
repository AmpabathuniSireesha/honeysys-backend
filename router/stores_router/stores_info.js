const  express=require("express")
const router=express.Router()
const storeModelController=require("../../controller/stores_controller/stores_info")
router.post("/createstore",storeModelController.createStore)
router.get("/getstore",storeModelController.getStore)
router.get("/getstoreby/:id",storeModelController.getStoreById)
router.delete("/deletestoreby/:id",storeModelController.deleteStore)
router.patch("/updatestoreby/:id",storeModelController.updateStore)
module.exports=router;