const mongoose=require("mongoose")
const userSchema = new mongoose.Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    gender:{
        type:String
    },
    email:{
        type:String,
        match:/.+\@+..+/
    },
    mobileno:{
        type:Number
    },
    password:{
        type:String
    },
    del_flag:{
        type:Number,default:0
    }

})
module.exports=mongoose.model("user_info",userSchema)