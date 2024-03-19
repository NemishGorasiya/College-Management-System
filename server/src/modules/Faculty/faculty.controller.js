import httpStatus from "http-status";
import Faculty from "./Faculty.js";
import Department from "../Department/Department.js";

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

    const departmentExists = await Department.findById(department).populate("subjects");

    if (!departmentExists) {
        return res.status(httpStatus.NOT_FOUND).json({ message: "Department not found" });
    }

    if (departmentExists.subjects.length === 0) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "Department has no subjects" });
    }

    //check if the subjects exists in the department
    const subjectIds = departmentExists?.subjects.map(subject => subject.id);

    for (let subject of subjects) {
        if (!subjectIds.includes(subject)) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: "Subject not found in the department" });
        }
    }

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

    return res.status(httpStatus.CREATED).json({ message: "Faculty created successfully", });
}

export const loginFaculty = async (req, res) => {
    return res.status(httpStatus.OK).send({
        message: "Faculty logged in successfully",
        user: req.user,
    })
}