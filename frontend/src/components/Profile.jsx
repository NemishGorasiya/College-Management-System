import "./Profile.scss";
import ServiceTitle from "./ServiceTitle";
import profileImage from "../assets/Nemish_Profile.jpg";
import ProfileSection from "./profile/ProfileSection";
import { formatDate, handleFallBackImage } from "../utils/utilityFunctions";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  fetchProfileData,
  requestEditProfile,
  uploadFile,
} from "../services/services";
import fallbackProfileImageMale from "../assets/fallbackProfileImageMale.png";
import CloseIcon from "@mui/icons-material/Close";
import fallbackProfileImageFemale from "../assets/fallbackProfileImageFemale.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Modal,
  OutlinedInput,
  Stack,
  styled,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { modalStyle } from "./modal/modalStyle";
import toast from "react-hot-toast";
import LoadingButton from "@mui/lab/LoadingButton";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Profile() {
  const { userType } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isUploadProfileImageModalOpen, setIsUploadProfileImageModalOpen] =
    useState(false);
  const handleUploadProfileImageModalOpen = () =>
    setIsUploadProfileImageModalOpen(true);
  const handleUploadProfileImageModalClose = () =>
    setIsUploadProfileImageModalOpen(false);

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [isProfileImageUploading, setIsProfileImageUploading] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    list: [],
    isLoading: true,
  });
  const [academicInfo, setAcademicInfo] = useState({
    list: [],
    isLoading: true,
  });
  const [userId, setUserId] = useState(null);

  const handleImageUpload = async () => {
    const fd = new FormData();
    fd.append("file", profileImageFile);
    try {
      setIsProfileImageUploading(true);
      const response = await uploadFile(fd);
      const {
        response: { secure_url },
      } = response;
      const res = await requestEditProfile({
        userType,
        data: { profilePicture: secure_url },
        userId,
      });
      if (res) {
        toast.success("Image edit request sent successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsProfileImageUploading(false);
      handleUploadProfileImageModalClose();
    }
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    console.log("fd", fd);
    const data = Object.fromEntries(fd.entries());
    console.log("form submitted", data);
    let editedData = {};

    // Compare updatedData with initial personalInfo and academicInfo
    personalInfo.list.forEach((detail) => {
      if (data[detail.name] != detail.value) {
        editedData[detail.name] = data[detail.name];
      }
    });

    try {
      const res = await requestEditProfile({
        userType,
        data: editedData,
        userId,
      });
      if (res) {
        toast.success("Profile update request sent successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [profilePicture, setProfilePicture] = useState(null);
  const getProfileData = useCallback(async () => {
    try {
      const res = await fetchProfileData();
      const { user } = res;
      console.log("profile", user);
      setUserId(user.id);
      const {
        fullName = "",
        dob = "",
        email = "",
        gender = "",
        bloodGroup = "",
        phoneNumber = "",
        fatherName = "",
        motherName = "",
        parentPhoneNumber = "",
        address = "",
        enrollmentNumber = "",
        doa = "",
        semester = "",
        passOutYear = "",
        department = "",
        designation = "",
        profilePicture = "",
        doj = "",
        firstName = "",
        lastName = "",
      } = user;

      let personalInfo = [
        { label: "First Name", value: firstName, name: "firstName" },
        { label: "Last Name", value: lastName, name: "lastName" },
        // { label: "Full Name", value: fullName, name: "fullName" },
        { label: "Date of Birth", value: formatDate(dob), name: "dob" },
        { label: "Email", value: email, name: "email" },
        { label: "Gender", value: gender, name: "gender" },
        { label: "Blood Group", value: bloodGroup, name: "bloodGroup" },
        { label: "Phone Number", value: phoneNumber, name: "phoneNumber" },
        { label: "Father's Name", value: fatherName, name: "fatherName" },
        { label: "Mother's Name", value: motherName, name: "motherName" },
        {
          label: "Parent's Phone Number",
          value: parentPhoneNumber,
          name: "parentPhoneNumber",
        },
        { label: "Address", value: address, name: "address" },
      ];

      const academicInfo = [
        {
          label: "Enrollment Number",
          value: enrollmentNumber,
          name: "enrollmentNumber",
        },
        // { label: "Date of Admission", value: formatDate(doa) ,name : "doa"},
        { label: "Date of Joining", value: formatDate(doj), name: "doj" },
        { label: "Semester", value: semester, name: "semester" },
        { label: "Pass Out Year", value: passOutYear, name: "passOutYear" },
        { label: "Department", value: department.name, name: "departmentName" },
        { label: "Designation", value: designation, name: "designation" },
      ];

      if (userType === "admin") {
        personalInfo = [...personalInfo, ...academicInfo];
      }

      setProfilePicture(
        profilePicture ??
          (gender === "MALE"
            ? fallbackProfileImageMale
            : fallbackProfileImageFemale)
      );

      setPersonalInfo({
        list: personalInfo,
        isLoading: false,
      });
      setAcademicInfo({
        list: academicInfo,
        isLoading: false,
      });
    } catch (error) {
      console.log("catch");
      console.error(error);
    }
  }, [userType]);

  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  return (
    <>
      <div className="profileContainer">
        <ServiceTitle serviceTitle="Profile details" />
        <div className="profileContentWrapper">
          <div className="profileLeftSection">
            <div className="profileImageContainer">
              <img
                className="profileImage"
                src={profilePicture}
                alt=""
                onError={(event) => {
                  handleFallBackImage(event, fallbackProfileImageMale);
                }}
              />
              <Button
                onClick={handleUploadProfileImageModalOpen}
                className="imageUploadBtn"
                variant="text"
              >
                <CloudUploadIcon />
              </Button>
            </div>
            {(userType === "student" || userType === "faculty") && (
              <Button
                onClick={handleOpen}
                className="editBtn"
                variant="contained"
              >
                <EditNoteIcon />
                Edit Profile
              </Button>
            )}
          </div>
          <div className="profileContent">
            <ProfileSection
              serviceSubTitle="Personal Information"
              profileDetails={personalInfo.list}
              isLoading={personalInfo.isLoading}
            />
            {(userType === "student" || userType === "faculty") && (
              <ProfileSection
                serviceSubTitle="Academic Information"
                profileDetails={academicInfo.list}
                isLoading={academicInfo.isLoading}
              />
            )}
          </div>
        </div>
      </div>
      <Modal open={open} className="editProfileModal">
        <Box className="dialogBox" sx={modalStyle}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 5,
              top: 5,
            }}
          >
            <CloseIcon />
          </IconButton>
          <form
            action=""
            className="editProfileForm"
            onSubmit={handleEditFormSubmit}
          >
            {personalInfo.list.map(
              (profileDetail) =>
                profileDetail.value && (
                  <FormControl
                    key={profileDetail.name}
                    variant="outlined"
                    className="formControl"
                  >
                    <InputLabel htmlFor={profileDetail.name}>
                      {profileDetail.label}
                    </InputLabel>
                    <OutlinedInput
                      defaultValue={profileDetail.value}
                      id={profileDetail.name}
                      name={profileDetail.name}
                      label={profileDetail.label}
                    />
                  </FormControl>
                )
            )}
            <Button
              type="submit"
              variant="contained"
              className="editProfileSubmitBtn"
            >
              Submit Edit Request
            </Button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={isUploadProfileImageModalOpen}
        className="uploadProfileImageModal"
      >
        <Box className="dialogBox" sx={modalStyle}>
          <IconButton
            onClick={handleUploadProfileImageModalClose}
            sx={{
              position: "absolute",
              right: 5,
              top: 5,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Button
            component="label"
            variant="contained"
            startIcon={<AttachFileIcon />}
            className="formControl"
            style={{ height: "56px" }}
          >
            Choose file
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => setProfileImageFile(e.target.files[0])}
            />
          </Button>
          <LoadingButton
            onClick={handleImageUpload}
            loading={isProfileImageUploading}
            loadingPosition="start"
            startIcon={<CloudUploadIcon />}
            variant="contained"
            style={{ height: "56px" }}
          >
            <span>Upload</span>
          </LoadingButton>
        </Box>
      </Modal>
    </>
  );
}
