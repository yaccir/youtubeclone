import mongoose  from "mongoose";

const userSchema=mongoose.Schema({

    fullname:{
        required:true,
        type:String,
    },
    email:{
        required:true,
        type:String,
    },
    password:{
        required:true,
        type:String
    },
    activeChannel:{
            type:[]
    }

})

const userModel=mongoose.model("users",userSchema);
export default userModel;