import httpStatus from "http-status";
import Department from "./Department.js";
import Faculty from "../Faculty/Faculty.js";

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
    let { page, limit, search, sortBy, orderBy } = req.query;
    const filterObj = {};

    page = parseInt(page) || 1;

    limit = (parseInt(limit) == 0 || limit == null || limit == undefined) ? 0 : (parseInt(limit) || 10);

    sortBy = sortBy || "name";
    orderBy = orderBy && (orderBy === "desc") ? "desc" : "asc";

    if (search) {
        filterObj.name = {
            $regex: search,
            $options: "i"
        }
    }

    //if limit is not there - search all pages
    // Added pagination
    const departments = await Department.find(filterObj).skip((page - 1) * limit).limit(limit).sort({ [sortBy]: orderBy }).populate("subjects").populate("faculties").populate("students"); //this uses dynamic keying

    return res.status(httpStatus.OK).json({
        message: "Departments fetched successfully",
        departments
    })
};

export const updateDepartment = async (req, res) => {
    const { id } = req.params;

    const department = await Department.findById(id);

    if (!department) {
        return res.status(httpStatus.NOT_FOUND).json({
            message: "Department not found"
        })
    }

    const keys = Object(req.body).keys;

    if (keys.includes("hod")) {
        const faculty = await Faculty.findById(req.body.hod);

        if (!faculty) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: "Faculty not found"
            });
        }

        if (faculty.department !== id) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "Faculty does not belong to this department"
            });
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
        department,
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