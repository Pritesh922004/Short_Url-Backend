export const SignOutUser = async (req, res) => {
    res.clearCookie("Access");
    res.status(200).json({message:"Logout Successfully"});
}