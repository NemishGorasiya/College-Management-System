import httpStatus from "http-status";
import CustomError from "../../errors/CustomError.js";
import { getUserType, otpEmailGeneration } from "../../utils/otpHandler.js";
import OTP from "../OTP/OTP.js";
import Student from "../Student/Student.js";
import Faculty from "../Faculty/Faculty.js";

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

export const generateOTP = async (req, res) => {
    try {
        const response = await otpEmailGeneration(req.user); //this will send the mail to the user

        return res.redirect("/user/validate-otp") //!NOTE: the user will be redirected to the change password frontend page
    } catch (err) {
        throw new CustomError(httpStatus.INTERNAL_SERVER_ERROR, "Error in generating OTP");
    }
};

export const validateOTP = async (req, res) => {
    const { otp } = req.body;
    const { id, email } = req.user;

    const otpDoc = await OTP.findOne({
        userId: id,
        email,
    });

    if (!otpDoc) {
        throw new CustomError(httpStatus.BAD_REQUEST, "Invalid OTP");
    }

    if (otpDoc.otp !== otp) {
        throw new CustomError(httpStatus.BAD_REQUEST, "Invalid OTP");
    }

    otpDoc.validated = true;
    await otpDoc.save();

    return res.send({
        message: "OTP validated successfully",
    });
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

    const userType = getUserType(req.user);

    let user;
    switch (userType) {
        case 'admin':
            user = req.user;
            break;
        case 'student':
            user = await Student.findById(req.user._id).populate("department", "_id name contactEmail contactPhoneNumber").select("_id enrollmentNumber firstName lastName dob doa email gender bloodGroup phoneNumber fatherName motherName parentPhoneNumber address passOutYear department age profilePicture")
            break;
        case 'faculty':
            user = await Faculty.findById(req.user._id)
            break;
        default:
            user = {};
            break;
    }

    return res.status(httpStatus.OK).send({
        message: "Profile fetched successfully",
        user,
    })
};