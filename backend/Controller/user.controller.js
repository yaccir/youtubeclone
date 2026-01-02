import bcrypt from "bcrypt"
import userModel from "../Models/User.Model.js";
import jwt from "jsonwebtoken"

export async function registeruser(req,res)
{
    const {email,password,fullname}= req.body;
    try{
        const newuser=userModel.create({
            fullname,
            email,
            password:bcrypt.hashSync(password, 10)
        })
        if(newuser)
            res.status(201).json({message:"user registered successfully"});
        else
            res.status(401).json({message:"user not registered"})


    }
    catch(err)
    {
        res.status(500).json(err)
    }
}



export async function login()
{

    const {email,password}=req.body;
    try{
        const loginuser=userModel.findOne({email})
        if(!loginuser)
            res.status(200).send("user not found");
        else{
          const checkpass=  bcrypt.compareSync(password, loginuser.password);
          if (checkpass)
          {
            var token = jwt.sign({ email }, 'secretkey');
            res.status(200).json({"token":token})
          }

        }
    }
    catch(err)
    {
        res.status(500).json(err)
    }


}