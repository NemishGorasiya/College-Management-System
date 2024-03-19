import httpStatus from "http-status";
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