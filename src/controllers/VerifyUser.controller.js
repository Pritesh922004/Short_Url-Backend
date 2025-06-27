export const VerifyUser = async (req, res) => {
    
    res.status(200).json({ user: req.user });
}