const mongoose=require("mongoose")
const registerSchema=new mongoose.Schema({
   username:{
       type:String
   },
    email:{
        type:String,
        match:/.+\@+..+/
    },
    otp:{
        type:String
    },
    // loginAttempts:{
    //     type:Number,default:0
    // }
})

module.exports=mongoose.model("register_details",registerSchema)