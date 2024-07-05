//to do
//req.body
import User from "../model/user";
import mongoose from mongoose

export function adminMiddleware(req, res, next) {

    // const { userId, email } = requestDataFromJWTToken(auth_token)

    // const user = User.findOne({userId,email})   TO DO 
    if (!user)
        if (user.type != "admin")
            return res.json({
                success: false,
                message: "unauthorised",
            })
    next();

    // continue

}