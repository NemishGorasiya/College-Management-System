import httpStatus from "http-status";
import Faculty from "./Faculty.js";
import Department from "../Department/Department.js";
import FacultyUpdateRequest from "./FacultyUpdateRequest.js";

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
};

export const loginFaculty = async (req, res) => {
    return res.status(httpStatus.OK).send({
        message: "Faculty logged in successfully",
        user: req.user,
    })
};

export const updateFaculty = async (req, res) => {
    let _id;
    if (req.user instanceof Admin) {
        _id = req.query.studentId;

        if (!_id) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: "Faculty id is required in the query params" });
        }
    } else {
        _id = req.user._id;
    }
    const changes = req.body;


    const faculty = await Faculty.findById(_id);

    if (!faculty) {
        return res.status(httpStatus.NOT_FOUND).json({ message: "Faculty not found" });
    }

    const facultyUpdateRequest = new FacultyUpdateRequest({
        faculty: _id,
        changes,
    });

    await facultyUpdateRequest.save();

    return res.status(httpStatus.OK).json({ message: "Faculty update request created successfully" });
};

export const deleteFaculty = async (req, res) => {
    const { facultyId } = req.params;

    const faculty = await Faculty.findById(facultyId);

    if (!faculty) {
        return res.status(httpStatus.NOT_FOUND).json({ message: "Faculty not found" });
    }

    await Faculty.deleteOne({
        _id: facultyId,
    });

    return res.status(httpStatus.OK).json({ message: "Faculty deleted successfully" });
}