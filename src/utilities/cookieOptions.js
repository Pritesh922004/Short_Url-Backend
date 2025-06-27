export const cookieOptions = ()=>{
    return{
        httponly:true,
        maxAge:1000*60*60*24,
        secure:process.env.NODE_ENV === "production",
        sameSite:process.env.NODE_ENV === "production" ? "none" : "lax"
    }
}  