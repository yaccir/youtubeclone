import express from"express";

const app=express();

const PORT =8085;

app.listen(PORT,()=>{
    console.log(`server started at ${PORT} `);
})

app.get("/",()=>{
    console.log("welcome to the root route")
})

