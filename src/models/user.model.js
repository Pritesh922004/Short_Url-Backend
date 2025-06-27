import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        select: false,
        required: [true, "Password is required"],
        minlength: [6, "Password should be at least 6 characters"]
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;