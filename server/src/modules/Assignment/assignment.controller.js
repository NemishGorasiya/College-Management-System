import httpStatus from "http-status";
import Assignment from "./Assignment.js";

export const createAssignment = async (req, res) => {
  const {
    name,
    description,
    totalMarks,
    subject,
    dueDate,
  } = req.body;

  const subjects = req.user.subjects.map((subject) => subject._id);

  if (!subjects.includes(subject)) {
    return res.status(httpStatus.FORBIDDEN).json({ message: "You are not allowed to create assignment for this subject" });
  }
  //TODO: check the req.user.subjects value before creating the assignment
  const assignment = new Assignment({
    name,
    description,
    totalMarks,
    subject,
    dueDate,
    faculty: req.user._id,
  });

  await assignment.save();

  return res.status(httpStatus.CREATED).json({ message: "Assignment created successfully" });
};

export const getOwnAssignments = async (req, res) => {
  const assignment = await Assignment.find({
    faculty: req.user._id
  }).populate("subject").sort({
    createdAt: -1, //recently created first
    dueDate: 1 //due date in ascending order (earliest due date first)
  });


  return res.status(httpStatus.OK).json(assignment);
};

export const updateAssignment = async (req, res) => {
  const { id } = req.params;

  const assignment = await Assignment.findById(id);

  if (!assignment) {
    return res.status(httpStatus.NOT_FOUND).json({ message: "Assignment not found" });
  }

  if (assignment.faculty.toString() !== req.user._id.toString()) {
    return res.status(httpStatus.FORBIDDEN).json({ message: "You are not allowed to update this assignment" });
  }

  for (let key of req.body) {
    assignment[key] = req.body[key];
  }

  await assignment.save();

  return res.status(httpStatus.OK).json({ message: "Assignment updated successfully" });
};

export const deleteAssignment = async (req, res) => {
  const { id } = req.params;

  const assignment = await Assignment.findById(id);

  if (!assignment) {
    return res.status(httpStatus.NOT_FOUND).json({ message: "Assignment not found" });
  }

  if (assignment.faculty.toString() !== req.user._id.toString()) {
    return res.status(httpStatus.FORBIDDEN).json({ message: "You are not allowed to delete this assignment" });
  }

  await Assignment.deleteOne({ _id: id });

  return res.status(httpStatus.OK).json({ message: "Assignment deleted successfully" });
};

export const getAllAssignments = async (req, res) => {
  let { search, limit, page } = req.query;
  const filterObj = {};

  limit = (parseInt(limit) == 0 || limit == null || limit == undefined) ? 0 : (parseInt(limit) || 10);

  if (search) {
    filterObj.name = {
      $regex: new RegExp(search),
      $options: "i"
    }
  }

  page = parseInt(page);

  const assignments = await Assignment.find(filterObj).limit(limit).skip((page - 1) * limit).sort({ createdAt: -1, dueDate: 1 }).populate("subject").populate("faculty");


  return res.status(httpStatus.OK).json({
    message: "Assignments fetched successfully",
    assignments
  })
};