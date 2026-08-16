export const cookieOptions = () => {
    const isLocalhost = Boolean(
        (process.env.Domain && process.env.Domain.includes("localhost")) ||
        (process.env.FRONTEND_URL && process.env.FRONTEND_URL.includes("localhost"))
    );
    const isSecure = process.env.NODE_ENV === "production" || Boolean(process.env.RAILWAY_ENVIRONMENT) || !isLocalhost;
    return {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        secure: isSecure,
        sameSite: isSecure ? "none" : "lax",
        path: "/"
    };
};
