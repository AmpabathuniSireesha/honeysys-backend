const mongoose=require("mongoose")
const url="mongodb://localhost:27017/user_info"
mongoose.connect(url,{}).then(()=>{
    console.log(`Database is connected...`)
})
