export const registerAdmin = async (req, res) => {
  const { email, phoneNumber, address, dob, doj, fullName, profilePicture } = req.body;

  if (!email || !phoneNumber || !address || !dob || !doj || !fullName) {
    return res.status(httpStatus.OK).json({ message: "Please provide all the details" });
  }

  const newAdmin = new Admin({
    email,
    phoneNumber,
    address,
    dob,
    doj,
    fullName,
    profilePicture,
  });

  await Admin.register(newAdmin, req.body.password);

  res.status(httpStatus.CREATED).json({ message: "Admin created successfully" });
}