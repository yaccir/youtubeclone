import express from"express";
import mongoose from "mongoose";
import { youtuberoutes } from "./Routes/youtuberoute.js";
import cors from "cors"
import dotenv from "dotenv";
const app=express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const PORT =8085;
app.use("/uploads", express.static("uploads"));

mongoose.connect('mongodb://127.0.0.1:27017/youtubebackend').then(()=>{
    console.log("db connected")
})
app.listen(PORT,()=>{
    console.log(`server started at ${PORT} `);
})

app.get("/",()=>{
    console.log("welcome to the root route")
})
youtuberoutes(app)


