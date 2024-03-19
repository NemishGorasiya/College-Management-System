import httpStatus from "http-status";
import Faculty from "../Faculty/Faculty.js";
import FacultyUpdateRequest from "../Faculty/FacultyUpdateRequest.js";
import Student from "../Student/Student.js";
import StudentUpdateRequest from "../Student/StudentUpdateRequest.js";
import Admin from "./Admin.js";

/**
 * registerAdmin - register a new admin
 * No access to any user
 * @date 3/18/2024 - 9:47:20 AM
 *
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {}
 */
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

/**
 * loginAdmin - login an admin
 * @date 3/18/2024 - 9:47:20 AM
 *
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {unknown}
 */
export const loginAdmin = async (req, res) => {

  delete req.user.hash;
  delete req.user.salt;

  return res.status(httpStatus.OK).send({
    message: "Admin logged in successfully",
    user: req.user,
  })
};

/**
 * Update an admin  - access - only admin
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns 
 */
export const updateAdmin = async (req, res) => {
  const { adminId } = req.params;

  const admin = await Admin.findById({ _id: adminId });

  for (let item in req.body) {
    admin[item] = req.body[item];
  }

  await admin.save();

  return res.status(httpStatus.OK).json({ message: "Admin updated successfully" });
};

/**
 * Delete an admin - access - only admin
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns 
 */
export const deleteAdmin = async (req, res) => {
  const { adminId } = req.params;

  await Admin.deleteOne({ _id: adminId });

  return res.status(httpStatus.OK).json({ message: "Admin deleted successfully" });
};


export const updateRequestsAdmin = async (req, res) => {
  const studentRequests = await StudentUpdateRequest.find({ status: "PENDING" }).populate("student");

  const facultyRequests = await FacultyUpdateRequest.find({ status: "PENDING" }).populate("faculty");

  return res.status(httpStatus.OK).json({
    studentRequests,
    facultyRequests,
  })
};

export const approveRequest = async (req, res) => {
  const { requestId } = req.params;

  const studentRequest = await StudentUpdateRequest.findById({ _id: requestId });

  const facultyRequest = await FacultyUpdateRequest.findById({ _id: requestId });

  if (!studentRequest && !facultyRequest) {
    return res.status(httpStatus.NOT_FOUND).json({ message: "Request not found" });
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

    changed = student;
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

    changed = faculty;
  }


  return res.status(httpStatus.OK).json({
    message: "Request approved successfully",
    changed,
  })
}