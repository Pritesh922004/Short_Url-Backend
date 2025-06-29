export const cookieOptions = ()=>{
    return{
        httpOnly:true,
        maxAge:1000*60*60*24,
        secure:true,
        sameSite:"lax"
    }
}  
