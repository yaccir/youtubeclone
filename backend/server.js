import express from"express";
import mongoose from "mongoose";
import { youtuberoutes } from "./Routes/youtuberoute.js";

const app=express();
app.use(express.json())
const PORT =8085;
app.use("/uploads", express.static("uploads"));

mongoose.connect('mongodb://127.0.0.1:27017/youtubebe12').then(()=>{
    console.log("db connected")
})
app.listen(PORT,()=>{
    console.log(`server started at ${PORT} `);
})

app.get("/",()=>{
    console.log("welcome to the root route")
})
youtuberoutes(app)


