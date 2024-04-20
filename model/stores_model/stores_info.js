const mongoose=require("mongoose")
const storeSchema=new mongoose.Schema({
    storename:{
        type:String
    },
    storeid:{
        type:String
    },
    storedescription:{
        type:String 
    },
    storecontact:{
        type:Number
    },
    del_flag:{
        type:Number,default:0
    }
})

module.exports=mongoose.model("store_details",storeSchema)