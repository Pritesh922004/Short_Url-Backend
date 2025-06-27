import ShortUrlSchema from "../models/Short_Url.js";

export const DeleteUrl = async (id) => {
    try {
        return await ShortUrlSchema.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }
}