import httpStatus from "http-status";
import CustomError from "../../errors/CustomError.js";
import otpGen from "otp-generator";

export const userLogout = async (req, res) => {
    req.logout({
        message: "User logged out successfully",
    }, (err) => {
        if (err) {
            throw new CustomError(httpStatus.INTERNAL_SERVER_ERROR, "Error in logging out the user");
        }

        return res.send({
            message: "User logged out successfully",
        })
    })
};

export const changePassword = async (req, res) => {
    //user is authenticated
    const { password, newPassword } = req.body;

    req.user.changePassword(password, newPassword, (err, result) => {
        if (err) {
            throw new CustomError(httpStatus.UNAUTHORIZED, "Invalid old password");
        }

        return res.send({
            message: "Password changed successfully",
        })
    })
};

export const getProfile = async (req, res) => {
    delete req["user"]["hash"]
    delete req["user"]["salt"]

    return res.status(httpStatus.OK).send({
        message: "Profile fetched successfully",
        user: req.user,
    })
};

export const otpGeneration = async (req, res) => {
    //the user will be sent an email with the otp


    //the otp will be stored in the database with the email
    //the otp will be sent to the user
    //the otp will be validated
    //the password will be changed
    //the otp will be deleted
    //the user will be logged in
    //the user will be redirected to the profile page
}