import httpStatus from "http-status";
import Student from "./Student.js";
import StudentUpdateRequest from "./StudentUpdateRequest.js";

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

export const studentUpdate = async (req, res) => {
    let _id;
    if (req.user instanceof Admin) {
        _id = req.query.studentId;

        if (!_id) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: "Student id is required in the query params" });
        }
    } else {
        _id = req.user._id;
    }

    const changes = req.body;

    const student = await Student.findById(_id);

    if (!student) {
        return res.status(httpStatus.NOT_FOUND).json({ message: "Student not found" });
    }

    const studentUpdateRequest = new StudentUpdateRequest({
        student: _id,
        changes,
    });

    await studentUpdateRequest.save();


    return res.status(httpStatus.OK).json({ message: "Student update request created successfully", studentUpdateRequest: studentUpdateRequest.id });
};

export const studentDelete = async (req, res) => {
    const { studentId } = req.params;

    const student = await Student.findById(studentId);

    if (!student) {
        return res.status(httpStatus.NOT_FOUND).json({ message: "Student not found" });
    }

    await Student.deleteOne({
        _id: student._id,
    })

    return res.status(httpStatus.OK).json({ message: "Student deleted successfully" });
}