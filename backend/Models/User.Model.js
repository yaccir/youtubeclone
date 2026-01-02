import mongoose  from "mongoose";

const userSchema=mongoose.Schema({

    fullname:String,
    email:{
        required:true,
        type:String,
    },
    password:{
        required:true,
        type:String
    }

})

const userModel=mongoose.model("users",userSchema);
export default userModel;