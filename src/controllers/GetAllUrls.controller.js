import { FetchUrls } from "../Dao/ShortUrlQuerys.js";

export const GetAllUrls = async (req, res) => {
    const UserId = req.user?.id;
    const data = await FetchUrls(UserId);
    res.status(200).json({data});
}