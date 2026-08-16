import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true
    },
    otp: {
        type: String,
        required: [true, "OTP is required"],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600 // Automatically expires and gets deleted after 10 minutes by MongoDB TTL
    }
});

const OtpModel = mongoose.model("Otp", OtpSchema);

export default OtpModel;
