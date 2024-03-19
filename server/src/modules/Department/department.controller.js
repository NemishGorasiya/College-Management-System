import httpStatus from "http-status";
import Department from "./Department.js";

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
}