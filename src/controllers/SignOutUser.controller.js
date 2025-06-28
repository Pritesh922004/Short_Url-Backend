import { BlockedToken } from "../service/token.service.js";

export const SignOutUser = async (req, res) => {
    const token = req.cookies.Access;
    if(!token) return res.status(401).json({error:"Unauthorized"});
    await BlockedToken(token,req.user?.id);
    res.clearCookie("Access");
    res.status(200).json({message:"Logout Successfully"});
}