import httpStatus from "http-status";
import Admin from "./Admin.js";

export const registerAdmin = async (req, res) => {
  const { email, phoneNumber, address, dob, doj, firstName, lastName, profilePicture } = req.body;

  if (!email || !phoneNumber || !address || !dob || !doj || !firstName || !lastName) {
    return res.status(httpStatus.OK).json({ message: "Please provide all the details" });
  }

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

  delete req.user.hash;
  delete req.user.salt

  return res.status(httpStatus.OK).send({
    message: "Admin logged in successfully",
    user: req.user,
  })
}

export const logoutAdmin = async (req, res) => {
  req.logout();
  return res.status(httpStatus.OK).json({ message: "Logged out successfully" });
}