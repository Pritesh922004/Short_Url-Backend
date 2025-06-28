import mongoose, { Schema } from "mongoose";
const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1d'
    }
});

const TokenModel = mongoose.model("Token", tokenSchema);

export default TokenModel;