import httpStatus from "http-status";
import Subject from "./Subject.js";

export const createSubject = async (req, res) => {
    const {
        name,
        subjectCode,
        department,
        semester,
        description,
        credits,
        hoursPerWeek,
        resources,
    } = req.body;

    const newSubject = new Subject({
        name,
        subjectCode,
        department,
        semester,
        description,
        credits,
        hoursPerWeek,
        resources,
    });

    await newSubject.save();

    return res.status(httpStatus.CREATED).json({
        message: "Subject created successfully",
        subject: newSubject.id
    });
};

export const getSubjects = async (req, res) => {
    const { department, semester, subjectCode } = req.query;
    const filterObj = {};

    if (subjectCode) {
        filterObj.subjectCode = subjectCode;
    }
    else if (department && semester) {
        filterObj.department = department;
        filterObj.semester = {
            $in: semester.split(",")
        };
    }
    else if (department) {
        filterObj.department = department;
    }
    else if (semester) {
        filterObj.semester = {
            $in: semester.split(",")
        };
    }

    const subjects = await Subject.find(filterObj).populate("department");

    return res.status(httpStatus.OK).json({
        message: "Subjects fetched successfully",
        subjects,
    })
};

export const updateSubject = async (req, res) => {
    const { id } = req.params;

    const subject = await Subject.findById(id);

    if (!subject) {
        return res.status(httpStatus.NOT_FOUND).json({
            message: "Subject not found"
        })
    }

    for (let key in req.body) {
        subject[key] = req.body[key];
    }

    await subject.save();

    return res.status(httpStatus.OK).json({
        message: "Subject updated successfully",
        subject,
    });
};

export const deleteSubject = async (req, res) => {
    const { id } = req.params;

    const subject = await Subject.findById(id);

    if (!subject) {
        return res.status(httpStatus.NOT_FOUND).json({
            message: "Subject not found"
        })
    }

    await Subject.deleteOne({ _id: id });

    return res.status(httpStatus.OK).json({
        message: "Subject deleted successfully",
    })
};