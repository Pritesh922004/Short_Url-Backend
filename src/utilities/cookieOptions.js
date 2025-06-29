export const cookieOptions = ()=>{
    return{
        httpOnly:true,
        maxAge:1000*60*60*24,
        secure:true,
        sameSite:"none",
        path:"/"
    }
}  
// export const cookieOptions = () => {
//     return {
//         httpOnly: true,
//         maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
//         secure: true, // Always use secure in all environments for mobile compatibility
//         sameSite: "none", // Use "none" for cross-site cookies in all environments
//         path: "/" // Explicitly set path to root
//     }
// }

// Update CORS configuration for better mobile support
// app.use(cors({
//     origin: [process.env.FRONTEND_URL.replace(/\/$/, ''), "http://localhost:5173"],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));

// // Add this before your routes
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Credentials', 'true');
//     next();
// });