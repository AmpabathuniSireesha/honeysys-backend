const express=require("express")
const cors=require("cors")
const path=require("path")
const app=express()
app.use(cors())
app.use(express.json())
const port=7171;
require("./connection/database")

const userRouter=require("./router/user_router/user_info");
app.use("/user", userRouter);
app.use("/product_img",express.static(path.join(__dirname,"product_img")));

const registerRouter=require("./router/register_router/register_info")
app.use("/user",registerRouter)


const productRouter=require("./router/products_router/products_info")
app.use("/product",productRouter)

const storeRouter=require("./router/stores_router/stores_info")
app.use("/store",storeRouter)

app.listen(port,()=>{
    console.log( `server is running on http://localhost:${port}`)
})
