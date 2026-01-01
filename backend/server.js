import express from"express";
import mongoose from "mongoose";

const app=express();

const PORT =8085;

mongoose.connect()

app.listen(PORT,()=>{
    console.log(`server started at ${PORT} `);
})

app.get("/",()=>{
    console.log("welcome to the root route")
})

