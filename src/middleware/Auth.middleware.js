import {  FindUserById } from "../Dao/user.querys.js";
import { verifyBlockedToken } from "../service/token.service.js";
import { VerifyToken } from "../service/User.service.js";


export const Auth = async (req, res, next) => {
    const token = req.cookies.Access;

    if (!token) return res.status(401).json({error:"Unauthorized"});

    const isBlocked = await verifyBlockedToken(token);

    if (isBlocked) return res.status(401).json({error:"Unauthorized"});

    const user = await VerifyToken(token);

    if (!user) return res.status(401).json({error:"Unauthorized"});

    const data = await FindUserById(user.id);

    if (!data) return res.status(401).json({error:"Unauthorized"});

    req.user = data;
    
    next();

}