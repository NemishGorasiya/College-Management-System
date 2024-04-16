import httpStatus from "http-status";
import Faculty from "./Faculty.js";
import Department from "../Department/Department.js";
import FacultyUpdateRequest from "./FacultyUpdateRequest.js";
import CustomError from "../../errors/CustomError.js";

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

    const departmentExists = await Department.findById(department).populate("subjects"); //foreign field virtual necessary for population

    if (!departmentExists) {
        throw new CustomError(httpStatus.NOT_FOUND, "Department not found");
    }

    //check if the subjects exists in the department
    const subjectIds = departmentExists?.subjects.map(sub => sub._id.toString());

    for (let subject of subjects) {
        if (!subjectIds.includes(subject)) {
            throw new CustomError(httpStatus.BAD_REQUEST, "Subject not found in the department");
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

    const registeredFaculty = await Faculty.register(newFaculty, req.body.password);

    return res.status(httpStatus.CREATED).json({
        message: "Faculty created successfully",
        faculty: registeredFaculty._id
    });
};

export const loginFaculty = async (req, res) => {
    const { _id, firstName, lastName, phoneNumber, email } = req.user;

    const user = {
        _id,
        firstName,
        lastName,
        phoneNumber,
        email,
    };

    return res.status(httpStatus.OK).send({
        message: "Faculty logged in successfully",
        user,
    })
};

export const updateFaculty = async (req, res) => {
    let _id;
    if (req.user instanceof Faculty) {
        _id = req.query.facultyId;
        console.log(_id);
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

export const getFaculty = async (req, res) => {
    let { page, limit, search, sortBy, orderBy } = req.query; //sortBy has options - name, designation, department
    const filterObj = {};

    if (search) {
        filterObj.firstName = {
            $regex: search,
            $options: "i"
        }
    }


    const data = await Faculty.find(filterObj).skip((page - 1) * limit).limit(limit).sort({ [sortBy]: orderBy });
    
    let faculties = []
    for (let faculty of data) {
        const obj = {
            _id: faculty._id,
            firstName: faculty.firstName,
            lastName: faculty.lastName,
            department: faculty.department,
            designation: faculty.designation,
            email: faculty.email
        }

        faculties.push(obj)
    }

    res.status(httpStatus.OK).json({ Faculty: faculties })


} 