import mongoose from "mongoose";

const ShortUrlSchema = new mongoose.Schema({
    Url: {
        type: String,
        required: true,
        trim: true
    },
    Short_Url: {
        type: String,
        required: true,
        unique: true
    },
    Clicks: {
        type: Number,
        default: 0
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},{timestamps:true});


const ShortUrlModel = mongoose.model("ShortUrl",ShortUrlSchema);

export default ShortUrlModel;