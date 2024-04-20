const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({
    productname:{
        type:String
    },
    productid:{
        type:String
    },
    productdescription:{
        type:String
    },
    productprice:{
        type:Number
    },
    image:{
        type:String
    },
    del_flag:{
        type:Number,default:0
    
    }
})
module.exports=mongoose.model("product_details",productSchema)