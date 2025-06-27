import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const hash = async (password)=>{
    try {
        return await bcrypt.hash(password,10);
    } catch (error) {
        console.log(error);
    }
}

export const ComparePassword = async (password,UserPassword)=>{
    try {
        return  bcrypt.compare(password,UserPassword)
    } catch (error) {
        console.log(error);
    }
}

export const CreateToken = async (id)=>{
    try {
        return await jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1d'});
    } catch (error) {
        console.log(error);
    }
}

export const VerifyToken = async (token)=>{
    try {
        if(!token) return null;
        return await jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        console.log(error);
    }
}