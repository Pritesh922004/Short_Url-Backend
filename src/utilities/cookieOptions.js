export const cookieOptions = () => {
    const isProduction = process.env.NODE_ENV === "production" && !process.env.Domain?.includes("localhost");
    return {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/"
    };
};