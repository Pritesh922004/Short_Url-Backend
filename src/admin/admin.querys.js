import UserModel from "../models/user.model.js";
import ShortUrlModel from "../models/Short_Url.js";

export const GetAdminStats = async () => {
    try {
        const totalUsers = await UserModel.countDocuments();
        const totalUrls = await ShortUrlModel.countDocuments();
        
        const clickAggregation = await ShortUrlModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalClicks: { $sum: "$Clicks" }
                }
            }
        ]);
        const totalClicks = clickAggregation.length > 0 ? clickAggregation[0].totalClicks : 0;

        const topUrls = await ShortUrlModel.find()
            .populate("User", "name email")
            .sort({ Clicks: -1 })
            .limit(5);

        const recentUrls = await ShortUrlModel.find()
            .populate("User", "name email")
            .sort({ createdAt: -1 })
            .limit(5);

        const recentUsers = await UserModel.find()
            .select("-password")
            .sort({ createdAt: -1 })
            .limit(5);

        return {
            totalUsers,
            totalUrls,
            totalClicks,
            topUrls,
            recentUrls,
            recentUsers
        };
    } catch (error) {
        console.error("GetAdminStats Error:", error);
        throw error;
    }
};

export const GetAllAdminUsers = async () => {
    try {
        const users = await UserModel.aggregate([
            {
                $lookup: {
                    from: "shorturls",
                    localField: "_id",
                    foreignField: "User",
                    as: "urls"
                }
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    totalLinks: { $size: "$urls" },
                    totalClicks: { $sum: "$urls.Clicks" }
                }
            },
            {
                $sort: { createdAt: -1 }
            }
        ]);

        return users;
    } catch (error) {
        console.error("GetAllAdminUsers Error:", error);
        throw error;
    }
};

export const DeleteAdminUser = async (userId) => {
    try {
        // Cascade delete all short URLs created by this user
        await ShortUrlModel.deleteMany({ User: userId });
        // Delete the user
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        return deletedUser;
    } catch (error) {
        console.error("DeleteAdminUser Error:", error);
        throw error;
    }
};

export const GetAllAdminUrls = async () => {
    try {
        const urls = await ShortUrlModel.find()
            .populate("User", "name email")
            .sort({ createdAt: -1 });
        return urls;
    } catch (error) {
        console.error("GetAllAdminUrls Error:", error);
        throw error;
    }
};

export const DeleteAdminUrl = async (urlId) => {
    try {
        const deletedUrl = await ShortUrlModel.findByIdAndDelete(urlId);
        return deletedUrl;
    } catch (error) {
        console.error("DeleteAdminUrl Error:", error);
        throw error;
    }
};
