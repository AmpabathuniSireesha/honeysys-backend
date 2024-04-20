const userModel=require("../../model/user_model/user_info");
const statusmessages = require("../../config/statusmessages");
const errormessages = require("../../config/errormessages");

exports.createUser=async(req,res)=>{       
    try{
        const{firstname,lastname,gender,email,mobileno,password}=req.body
        if(!firstname||!lastname||!gender||!email||!mobileno||!password){
            return res.status(401).json({
                status:statusmessages.statusFailed,
                message:errormessages.allFieldsRequired
            })
        }
        const mobilenoRegExp=/^\d{10}$/
        if(!mobilenoRegExp.test(mobileno)){
            return res.status(501).json({
                status:statusmessages.statusFailed,
                message:errormessages.invalidMobileNumber
            })
        }
        
    const emailRegExp=/.+\@+..+\.+/
    if(!emailRegExp.test(email)){
        return res.status(501).json({
            status:statusmessages.statusFailed,
            message:errormessages.invalidEmail
        })
    }
    const passwordRegExp=/^\d{5}$/
        if(!passwordRegExp.test(password)){
            return res.status(501).json({
                status:statusmessages.statusFailed,
                message:errormessages.incorrectPassword
            })
        }
        const userDataInfo=await userModel.create({firstname,lastname,gender,email,mobileno,password})
        return res.status(201).json({
            status:statusmessages.statusSuccess,
            message:"User information created successfully",
            userDataInfo
        })
    } 
    catch(error){
        return res.status(401).json({
            status:statusmessages.statusFailed,
            message:error.message
        })
    }
}





exports.getUser=async(req,res)=>{
    try{
        const getUserData=await userModel.find({del_flag:0})
        return res.status(201).json({
            status:statusmessages.statusSuccess,
            message:"Get API created successfully",
            getUserData
        })
    }
    catch(err){
       return res.status(401).json({
        status:statusmessages.statusFailed,
        message:err.message
       })
    }
}

exports.getUserById=async(req,res)=>{
    try{
        const id=req.params.id
        const getUserDataById=await userModel.findById(id,{del_flag:0})
        return res.status(200).json({
            status:statusmessages.statusSuccess,
            message:"This is User data",
            getUserDataById
        })
    }
    catch(err){
       return res.status(201).json({
        status:statusmessages.statusFailed,
        message:err.message
       })
    }
}



//Delete (Soft Delete) 
// exports.deleteUser=async(req,res)=>{
//     try {
//         const id=req.params.id
// // Check if the user is already marked as deleted
// const userToDelete = await userModel.findById(id);
// if (userToDelete.del_flag === 1) {
//     return res.status(400).json({
//         status: "failed",
//         message:errorMessages.alreadyDeleted
//     });
// }
// // Deleting the data if it is not deleted
// const deleteUserDataById=await userModel.findByIdAndUpdate({_id:id},{del_flag:1},{new:true})
//         // if (!deleteUserDataById) {
// //     return res.status(200).json({
// //         status: "failed",
// //         message: "User not found."
// //     });
// // }
// return res.status(200).json({
//     message: "User Data deleted successfully",
//     deleteUserDataById
// });
// } catch (error) {
// return res.status(401).json({
//     status: "failed",
//     message: error.message
// });
// }
// }



exports.deleteUser=async(req,res)=>{
    try{
      const id=req.params.id
      const deleteUserById=await userModel.findById(id)
      if (deleteUserById.del_flag === 1) {
            return res.status(400).json({
                status: statusmessages.statusFailed,
                message: errormessages.alreadyDeleted
            });
        }
       // Deleting the data if it is not deleted
const deleteUserDataById=await userModel.findByIdAndUpdate({_id:id},{del_flag:1},{new:true})
        if (!deleteUserDataById) {
    return res.status(200).json({
        status: statusmessages.statusFailed,
        message: errormessages.notFound
    });
}

      return res.status(200).json({
        status:statusmessages.statusSuccess,
        message:"User information deleted successfully",
        deleteUserById
      })
    }
    catch(error){
     return res.status(201).json({
        status:statusmessages.statusFailed,
        message:error.message
     })
    }
  }
  

// Update API

exports.userUpdate=async(req,res)=>{
    try {
        const id=req.params.id
        //  Mobile validation
        const{mobileno}=req.body
        const mobilenoRegExp=/^\d{10}$/
if(!mobilenoRegExp.test(mobileno)){
    return res.status(501).json({
        status:statusmessages.statusFailed,
        message:"Invalid mobile number"
    })
}
        const findUserInfo=await userModel.findById(id)
        if(findUserInfo){
            // email validation
            if(req.body.email){
                const emailRegExp= /.+\@+..+\.+..+/
if(!emailRegExp.test(req.body.email)){
    return res.status(501).json({
        status:statusmessages.statusFailed,
        message:"Invalid email Id"
    })
}
            }
            // Password validation
            if(req.body.password){
const passwordRegExp=/^\d{05}$/
if(!passwordRegExp.test(req.body.password)){
    return res.status(501).json({
        status:statusmessages.statusFailed,
        message:"Invalid password"
    })
}
            }
            const modifyUserInfo=await userModel.findByIdAndUpdate({_id:id},{$set:req.body},{new:true})
            return res.status(200).json({
                status:statusmessages.statusSuccess,
                message:"User Information updated successfully",
                modifyUserInfo
            })
        }
        else{
            return res.status(404).json({
                status:statusmessages.statusFailed,
                message:"User not found"
            })
        }  
    } catch (error) {
        return res.status(401).json({
            status:statusmessages.statusFailed,
            message:error.message
        })
        
    }
}