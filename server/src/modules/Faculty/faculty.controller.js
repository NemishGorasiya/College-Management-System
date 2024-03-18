import httpStatus from "http-status";
import Faculty from "./Faculty.js";

/**
 * registerFaculty - register a new faculty
 * access: admin
 * @date 3/18/2024 - 9:46:17 AM
 *
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
export const registerFaculty = async (req, res) => {
    const {
        firstName,
        lastName,
        department,
        designation,
        address,
        phoneNumber,
        email,
        qualification,
        experience,
        dob,
        doj,
        salary,
        semesters,
        subjects,
        profilePicture
    } = req.body;

    const newFaculty = new Faculty({
        firstName,
        lastName,
        department,
        designation,
        address,
        phoneNumber,
        email,
        qualification,
        experience,
        dob,
        doj,
        salary,
        semesters,
        subjects,
        profilePicture: profilePicture || "",
    });

    await Faculty.register(newFaculty, req.body.password);

    return res.status(httpStatus.CREATED).json({ message: "Faculty created successfully", faculy: newFaculty.id });
}

export const loginFaculty = async (req, res) => {
    return res.status(httpStatus.OK).send({
        message: "Faculty logged in successfully",
        user: req.user,
    })
}