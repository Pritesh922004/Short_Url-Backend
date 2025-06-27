import ShortUrlSchema from "../models/Short_Url.js";

export const StoreShortUrl = async (Url, ShortUrl, UserID) => {

    try {

        if (!UserID) return await ShortUrlSchema.create({ Url: Url, Short_Url: ShortUrl });
        return await ShortUrlSchema.create({ Url: Url, Short_Url: ShortUrl, User: UserID });
    } catch (error) {
        console.log(error);
    }
}

export const FindUrl = async (id) => {
    try {
        const data = await ShortUrlSchema.findOneAndUpdate({ Short_Url: id }, { $inc: { Clicks: 1 } });
        return data;
    } catch (error) {
        console.log(error);
    }

}

export const CheckShortUrl = async (id) => {
    try {
        return await ShortUrlSchema.findOne({ Short_Url: id });
    } catch (error) {
        console.log(error);
    }

}

export const FetchUrls = async (UserId) => {
    try {
        return await ShortUrlSchema.find({ User: UserId });
    } catch (error) {
        console.log(error);
    }
}
