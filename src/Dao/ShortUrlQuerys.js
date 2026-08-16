import ShortUrlSchema from "../models/Short_Url.js";

export const StoreShortUrl = async (Url, ShortUrl, UserID) => {
    try {
        if (!UserID) {
            return await ShortUrlSchema.create({ Url: Url, Short_Url: ShortUrl });
        }
        return await ShortUrlSchema.create({ Url: Url, Short_Url: ShortUrl, User: UserID });
    } catch (error) {
        console.error("StoreShortUrl DAO Error:", error);
        throw error;
    }
};

export const FindUrl = async (id) => {
    try {
        const data = await ShortUrlSchema.findOneAndUpdate({ Short_Url: id }, { $inc: { Clicks: 1 } }, { new: true });
        return data;
    } catch (error) {
        console.error("FindUrl DAO Error:", error);
        throw error;
    }
};

export const CheckShortUrl = async (id) => {
    try {
        return await ShortUrlSchema.findOne({ Short_Url: id });
    } catch (error) {
        console.error("CheckShortUrl DAO Error:", error);
        throw error;
    }
};

export const FetchUrls = async (UserId) => {
    try {
        return await ShortUrlSchema.find({ User: UserId }).sort({ createdAt: -1 });
    } catch (error) {
        console.error("FetchUrls DAO Error:", error);
        throw error;
    }
};

