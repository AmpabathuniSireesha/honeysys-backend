const storeModel=require("../../model/stores_model/stores_info");
const errorMessages = require("../../config/errormessages");
const statusMessages=require("../../config/statusmessages");
exports.createStore=async(req,res)=>{
    try{
        const {storename,storeid,storedescription,storecontact}=req.body
        if(!storename||!storeid||!storedescription||!storecontact){
            return res.status(401).json({
                status:statusMessages.statusFailed,
                message:"Please provide all the fields"
            })
        }
   const storeDataInfo=await storeModel.create({storename,storeid,storedescription,storecontact})
   return res.status(201).json({
    status:statusMessages.statusSuccess,
    message:"Store module created successfully",
    storeDataInfo
   })
    }
    catch(error){
        return res.status(401).json({
            status:statusMessages.statusFailed,
           message:error.message
        })
    }
}






exports.getStore=async(req,res)=>{
    try{
        const getStoreData=await storeModel.find()
        return res.status(201).json({
            status:statusMessages.statusSuccess,
            message:"Get API created successfully",
            getStoreData
        }) 
    }
    catch(err){
        return res.status(401).json({
            status:statusMessages.statusFailed,
            message:err.message
        })
    }
}




exports.getStoreById=async(req,res)=>{
    try{
        const id=req.params.id
        const getStoreDatabyId=await storeModel.findById(id)
        return res.status(200).json({
            status:statusMessages.statusSuccess,
            message:"This is Store data",
            getStoreDatabyId
        })
    }
    catch(err){
        return res.status(401).json({
            status:statusMessages.statusFailed,
            message:err.message
        })
    }
}


exports.deleteStore=async(req,res)=>{
    try{
      const id=req.params.id
      const deleteStoreById=await storeModel.findById(id)
      if (deleteStoreById.del_flag === 1) {
            return res.status(400).json({
                status: statusMessages.statusFailed,
                message: errorMessages.alreadyDeleted
            });
        }
        
       // Deleting the data if it is not deleted
const deleteStoreDataById=await storeModel.findByIdAndUpdate({_id:id},{del_flag:1},{new:true})
        if (!deleteStoreDataById) {
    return res.status(200).json({
        status: statusMessages.statusFailed,
        message: errorMessages.notFound
    });
}

      return res.status(200).json({
        status:statusMessages.statusSuccess,
        message:"Store information deleted successfully",
        deleteStoreById
      })
    }
    catch(error){
     return res.status(201).json({
        status:statusMessages.statusFailed,
        message:error.message
     })
    }
  }
  
  



  exports.updateStore=async(req,res)=>{
    try{
        const id=req.params.id
        const findStoreInfo=await storeModel.findById(id)
        if(findStoreInfo){
            const modifyStoreInfo=await storeModel.findByIdAndUpdate({_id:id},{$set:req.body},{new:true})
            return res.status(200).json({
                status:statusMessages.statusSuccess,
                message:"Store information updated successfully",
                modifyStoreInfo
            })
        }
    }
    catch(error){
        return res.status(401).json({
            status:statusMessages.statusFailed,
            message:error.message
        })
    }
}


