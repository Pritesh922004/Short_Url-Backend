import UserModel from "../models/user.model.js";
import { hash } from "../service/User.service.js";

export const AddUser = async (name, email, password) => {
    try {
        const SecurePassword = await hash(password);
        const user = await UserModel.create({ name, email, password:SecurePassword });
        return user;
    } catch (error) {
        console.log(error);
    }
}

export const FindUser = async (email) => {
    try {
        const user = await UserModel.findOne({ email }).select('+password');
        return user;
    } catch (error) {
        console.log(error);
    }
}

export const FindUserById = async (id) => {
    try {
        const user = await UserModel.findById(id);
        return user;
    } catch (error) {
        console.log(error);
    }
}