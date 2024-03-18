import httpStatus from "http-status";
import Student from "./Student.js";

export const studentRegister = async (req, res) => {
    const {
        enrollmentNumber,
        firstName,
        lastName,
        dob,
        doa,
        email,
        gender,
        bloodGroup,
        phoneNumber,
        fatherName,
        motherName,
        parentPhoneNumber,
        address,
        age,
        semester,
        passOutYear,
        profilePicture,
        department,
    } = req.body;

    const newStudent = new Student({
        enrollmentNumber,
        firstName,
        lastName,
        dob,
        doa,
        email,
        gender,
        bloodGroup,
        phoneNumber,
        fatherName,
        motherName,
        parentPhoneNumber,
        address,
        age,
        semester,
        passOutYear,
        profilePicture,
        department,
    });
    await Student.register(newStudent, req.body.password);

    return res.status(httpStatus.CREATED).json({ message: "Student created successfully", student: newStudent.id });
};

export const studentLogin = async (req, res) => {
    return res.status(httpStatus.OK).send({
        message: "Student logged in successfully",
        user: req.user,
    });
};