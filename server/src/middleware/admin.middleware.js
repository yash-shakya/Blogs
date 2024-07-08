//to do
//req.body
import User from "../model/user";
import cookieParser from "cookie-parser";

export function adminMiddleware(req, res, next) {
    cookieParser();
    const { userId, email } = req.cookies;

    if (!userId || !email) {
        return res.json({
            success: false,
            message: "Missing userId or email in cookie",
        });
    }

    const user = User.findOne({ _id: userId, email });

    if (!user) {
        return res.json({
            success: false,
            message: "User not found",
        });
    }

    if (user.role !== "admin") {
        return res.json({
            success: false,
            message: "User is not admin",
        });
    }

    next();
}