import express from "express"
import dotenv from "dotenv"
import bodyParser from 'body-parser';
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import cookieParser from "cookie-parser";
import connectToMongoDB from "./db/connectToMongoDB.js";


const app=express();
const PORT=process.env.PORT||5000;


dotenv.config();    
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);



app.get("/",(req,res)=>{
    res.send("hello worldmnmm")
})

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`sever is running on ${PORT}`)
});