import { VerifyToken } from "../service/User.service.js";

export const CheckUserId = async (req, res, next) => {

    const token = req.cookies.Access;
    if (!token) return next();
    const user = await VerifyToken(token);
    if (!user) return next();
    req.user = user;
    next();
}