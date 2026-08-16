import UserModel from "../models/user.model.js";
import OtpModel from "../models/otp.model.js";
import { hash } from "../service/User.service.js";

export const AddUser = async (name, email, password) => {
    try {
        const SecurePassword = await hash(password);
        const user = await UserModel.create({ name, email, password: SecurePassword });
        return user;
    } catch (error) {
        console.error("AddUser DAO Error:", error);
        throw error;
    }
};

export const FindUser = async (email) => {
    try {
        const user = await UserModel.findOne({ email: email.toLowerCase().trim() }).select('+password');
        return user;
    } catch (error) {
        console.error("FindUser DAO Error:", error);
        throw error;
    }
};

export const FindUserById = async (id) => {
    try {
        const user = await UserModel.findById(id);
        return user;
    } catch (error) {
        console.error("FindUserById DAO Error:", error);
        throw error;
    }
};

export const SaveOtpRecord = async (email, otp) => {
    try {
        const normalizedEmail = email.toLowerCase().trim();
        // Remove any previous OTPs for this email
        await OtpModel.deleteMany({ email: normalizedEmail });
        // Create new OTP document
        const otpRecord = await OtpModel.create({
            email: normalizedEmail,
            otp: otp.trim()
        });
        return otpRecord;
    } catch (error) {
        console.error("SaveOtpRecord DAO Error:", error);
        throw error;
    }
};

export const FindOtpRecord = async (email, otp) => {
    try {
        const normalizedEmail = email.toLowerCase().trim();
        const otpRecord = await OtpModel.findOne({
            email: normalizedEmail,
            otp: otp.trim()
        });
        return otpRecord;
    } catch (error) {
        console.error("FindOtpRecord DAO Error:", error);
        throw error;
    }
};

export const DeleteOtpRecord = async (email) => {
    try {
        const normalizedEmail = email.toLowerCase().trim();
        await OtpModel.deleteMany({ email: normalizedEmail });
        return true;
    } catch (error) {
        console.error("DeleteOtpRecord DAO Error:", error);
        throw error;
    }
};

export const UpdateUserPassword = async (email, newPassword) => {
    try {
        const normalizedEmail = email.toLowerCase().trim();
        const hashedPassword = await hash(newPassword);
        const updatedUser = await UserModel.findOneAndUpdate(
            { email: normalizedEmail },
            { password: hashedPassword },
            { new: true }
        );
        return updatedUser;
    } catch (error) {
        console.error("UpdateUserPassword DAO Error:", error);
        throw error;
    }
};