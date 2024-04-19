import httpStatus from "http-status";
import Faculty from "../Faculty/Faculty.js";
import FacultyUpdateRequest from "../Faculty/FacultyUpdateRequest.js";
import Student from "../Student/Student.js";
import StudentUpdateRequest from "../Student/StudentUpdateRequest.js";
import Admin from "./Admin.js";
import CustomError from "../../errors/CustomError.js";
import { getUserType } from "../../utils/otpHandler.js";

export const registerAdmin = async (req, res) => {
  const { email, phoneNumber, address, dob, doj, firstName, lastName, profilePicture } = req.body;

  const newAdmin = new Admin({
    email,
    phoneNumber,
    address,
    dob,
    doj,
    firstName,
    lastName,
    profilePicture: profilePicture || "",
  });

  await Admin.register(newAdmin, req.body.password);

  return res.status(httpStatus.CREATED).json({ message: "Admin created successfully" });
};

export const loginAdmin = async (req, res) => {
  const { _id, email, phoneNumber, dob, doj, firstName, lastName, profilePicture, isActive } = req.user;

  const user = {
    _id,
    email,
    phoneNumber,
    dob,
    doj,
    firstName,
    lastName,
    profilePicture,
    isActive,
    userType: getUserType(req.user)
  };

  return res.status(httpStatus.OK).send({
    message: "Admin logged in successfully",
    user
  })
};

export const updateAdmin = async (req, res) => {
  const { adminId } = req.params;

  const admin = await Admin.findById({ _id: adminId });

  if (!admin) {
    throw new CustomError(httpStatus.NOT_FOUND, "Admin not found");
  }

  for (let item in req.body) {
    admin[item] = req.body[item];
  }

  await admin.save();

  return res.status(httpStatus.OK).json({ message: "Admin updated successfully" });
};

export const deleteAdmin = async (req, res) => {
  const { adminId } = req.params;

  await Admin.findByIdAndDelete(adminId);

  return res.status(httpStatus.OK).json({ message: "Admin deleted successfully" });
};

export const updateRequestsAdmin = async (req, res) => {
  const studentRequests = await StudentUpdateRequest.find().populate("student").populate("actionBy").select({
    student: {
      password: 0,
      isActive: 0,
      isVerified: 0,
      isSuspended: 0,
      isDeleted: 0,
      role: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
      department: 0,
      semester: 0,
    }
  });

  const facultyRequests = await FacultyUpdateRequest.find().populate("faculty").populate("actionBy").select({
    faculty: {
      password: 0,
      isActive: 0,
      isVerified: 0,
      isSuspended: 0,
      isDeleted: 0,
      role: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
      department: 0,
    }
  });

  let studentRequestsArray = [], facultyRequestsArray = [], approvedRequestsArray = [];

  for (let item of studentRequests) {
    if (item.status === "PENDING") {
      studentRequestsArray.push(item);
    } else {
      approvedRequestsArray.push(item);
    }
  }

  for (let item of facultyRequests) {
    if (item.status === "PENDING") {
      facultyRequestsArray.push(item);
    } else {
      approvedRequestsArray.push(item);
    }
  }

  return res.status(httpStatus.OK).json({
    message: "Requests fetched successfully",
    studentRequests: studentRequestsArray,
    facultyRequests: facultyRequestsArray,
    approvedRequests: approvedRequestsArray,
  })
};

export const approveRequest = async (req, res) => {
  const { requestId } = req.params;

  const studentRequest = await StudentUpdateRequest.findById({ _id: requestId });

  const facultyRequest = await FacultyUpdateRequest.findById({ _id: requestId });

  if (!studentRequest && !facultyRequest) {
    return res.status(httpStatus.NOT_FOUND).json({ message: "Request not found" });
  }

  if (studentRequest && studentRequest.status === "APPROVED") {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Request already approved" });
  } else if (facultyRequest && facultyRequest.status === "APPROVED") {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Request already approved" });
  }

  let changed;

  if (studentRequest) {
    studentRequest.status = "APPROVED";
    studentRequest.actionBy = req.user._id; //admin id
    await studentRequest.save();

    //make changes to the student
    const student = await Student.findById({ _id: studentRequest.student });

    for (let item in studentRequest.changes) {
      student[item] = studentRequest.changes[item];
    }

    await student.save();

    changed = studentRequest.changes;
  } else {
    facultyRequest.status = "APPROVED";
    facultyRequest.actionBy = req.user._id; //admin id
    await facultyRequest.save();

    //make changes to the faculty
    const faculty = await Faculty.findById({ _id: facultyRequest.faculty });

    for (let item in facultyRequest.changes) {
      faculty[item] = facultyRequest.changes[item];
    }

    await faculty.save();

    changed = facultyRequest.changes;
  }


  return res.status(httpStatus.OK).json({
    message: "Request approved successfully",
    updated: changed,
  })
}