import { validationResult } from "express-validator"
import { FindUser } from "../Dao/user.querys.js";
import { ComparePassword, CreateToken } from "../service/User.service.js";
import { cookieOptions } from "../utilities/cookieOptions.js";


export const SignIn = async (req,res)=>{
    const result = validationResult(req);

    if (!result.isEmpty()) return res.send({ error: result.array() });

    const { email, password } = req.body;

    if(!email || !password) return res.status(400).json({error:"All fields are required"});

    const user = await FindUser(email);

    if(!user) return res.status(400).json({error:" Credentials"});

    const isPasswordValid = await ComparePassword(password,user.password);

    if(!isPasswordValid) return res.status(400).json({error:"Invalid Credentials"});

    const token = await CreateToken(user._id);

    if(!token) return res.status(500).json({error:"Something went wrong"});

    delete user._doc.password;

    res.cookie("Access",token,cookieOptions());

    res.status(200).json({message:"Login Successfully",user:user});
}
