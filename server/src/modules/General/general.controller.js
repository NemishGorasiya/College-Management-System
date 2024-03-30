import httpStatus from "http-status";
import CustomError from "../../errors/CustomError.js";

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