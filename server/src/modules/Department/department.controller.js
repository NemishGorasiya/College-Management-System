import httpStatus from "http-status";
import Department from "./Department.js";
import Faculty from "../Faculty/Faculty.js";
import CustomError from "../../errors/CustomError.js";

export const createDepartment = async (req, res) => {
    const {
        name,
        contactEmail,
        contactPhoneNumber,
        officeAddress,
        budget,
        researchAreas,
        facilities,
        accreditation,
        departmentLogo,
        doe
    } = req.body;

    const newDepartment = new Department({
        name,
        contactEmail,
        contactPhoneNumber,
        officeAddress,
        budget,
        researchAreas,
        facilities,
        accreditation,
        departmentLogo,
        doe
    });

    await newDepartment.save(); //this is an async operation

    return res.status(httpStatus.CREATED).json({
        message: "Department created successfully",
        department: newDepartment
    });
};

export const getDepartments = async (req, res) => {
    let { page, limit, search, sortBy, orderBy } = req.query; //sortBy has options - name, budget, doe, accreditation
    const filterObj = {};

    if (search) {
        filterObj.name = {
            $regex: search,
            $options: "i"
        }
    }

    //if limit is not there - search all pages
    // Added pagination
    const departments = await Department.find(filterObj).skip((page - 1) * limit).limit(limit).sort({ [sortBy]: orderBy }).populate("subjects", "_id name subjectCode credits").populate("faculties","_id firstName lastName email").populate("students","_id enrollmentNumber firstName lastName email gender").select("_id name contactEmail contactPhoneNumber officeAddress accreditation departmentLogo hod faculties subjects students"); //this uses dynamic keying

    return res.status(httpStatus.OK).json({
        message: "Departments fetched successfully",
        departments
    })
};

export const getDepartment = async (req, res) => {
    const { id } = req.params;
    const department = await Department.findById(id).populate("subjects", "_id name subjectCode credits").populate("faculties","_id firstName lastName email").populate("students","_id enrollmentNumber firstName lastName email gender").select("_id name contactEmail contactPhoneNumber officeAddress accreditation departmentLogo hod faculties subjects students"); //this uses dynamic keying

    if (!department) {
        throw new CustomError(httpStatus.NOT_FOUND, "Department not found");
    }

    return res.status(httpStatus.OK).json({
        message: "Department fetched successfully",
        department
    });
}

export const updateDepartment = async (req, res) => {
    const { id } = req.params;

    const department = await Department.findById(id);

    if (!department) {
        return res.status(httpStatus.NOT_FOUND).json({
            message: "Department not found"
        })
    }

    const keys = Object.keys(req.body);

    if (keys.includes("hod")) {
        //update HOD logic - add new HOD logic
        const faculty = await Faculty.findById(req.body.hod);

        if (!faculty) {
            throw new CustomError(httpStatus.NOT_FOUND, "Faculty not found")
        }

        if (faculty.department.toString() !== id) {
            throw new CustomError(httpStatus.BAD_REQUEST, "Faculty doesn't belong to the department")
        }

        faculty.isHOD = true;
        await faculty.save();
    }

    for (let key in req.body) {
        department[key] = req.body[key];
    }

    await department.save();

    return res.status(httpStatus.OK).json({
        message: "Department updated successfully",
    });
};

export const deleteDepartment = async (req, res) => {
    const { id } = req.params;

    const department = await Department.findById(id);

    if (!department) {
        return res.status(httpStatus.NOT_FOUND).json({
            message: "Department not found"
        })
    }

    await department.deleteOne({ _id: id });

    return res.status(httpStatus.OK).json({
        message: "Department deleted successfully"
    });
};