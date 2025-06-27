import { DeleteUrl } from "../Dao/DeleteUrl.js";

export const DeleteUrls = async (req, res) => {
    const { id } = req.body;
    console.log(id);
    await DeleteUrl(id);
    res.status(200).json({message:"Deleted"});
}