import { validationResult } from "express-validator";
import { AddUser, FindUser } from "../Dao/user.querys.js";
import { cookieOptions } from "../utilities/cookieOptions.js";
import { CreateToken } from "../service/User.service.js";

export const Signup = async (req, res) => {

    const Result = validationResult(req);

    if (!Result.isEmpty()) return res.send({ error: Result.array() });

    const { name, email, password } = req.body;

    if(!name || !email || !password) return res.status(400).json({error:"All fields are required"});

    const user = await FindUser(email);

    if (user) return res.status(400).json({error:"User already exists"});

    const data = await AddUser(name, email, password);

if(!data) return res.status(500).json({error:"Something went wrong"});

    const token = await CreateToken(data._id);

if(!token) return res.status(500).json({error:"Something went wrong"});
    
    delete data._doc.password;

    res.cookie("Access",token,cookieOptions());

    res.status(201).json({message:"Signup Successfully"});
}