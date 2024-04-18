import "./Profile.scss";
import ServiceTitle from "./ServiceTitle";
import profileImage from "../assets/Nemish_Profile.jpg";
import ProfileSection from "./profile/ProfileSection";
import { formatDate } from "../utils/utilityFunctions";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchProfileData } from "../services/services";

const user = {
  _id: "660ce687966f7f6303f10fe8",
  enrollmentNumber: 1234567890,
  firstName: "Naineel Soyantar",
  lastName: "Soyantar",
  dob: "1999-05-15T00:00:00.000Z",
  doa: "2021-09-01T00:00:00.000Z",
  email: "naineelsoyantar@gmail.com",
  gender: "MALE",
  bloodGroup: "A+",
  phoneNumber: 9023031861,
  fatherName: "Bharat Soyantar",
  motherName: "Niru Soyantar",
  parentPhoneNumber: 9876543201,
  address: "123 Main Street, Cityville",
  semester: 1,
  passOutYear: 2025,
  department: "660cdaff05dc0154e90275d8",
  createdAt: "2024-04-03T05:17:59.140Z",
  updatedAt: "2024-04-03T05:17:59.140Z",
  age: 25,
  __v: 0,
  fullName: "Naineel Computer Soyantar",
  id: "660ce687966f7f6303f10fe8",
};
const personalInfo = [
  { label: "Full Name", value: fullName },
  { label: "First Name", value: firstName },
  { label: "Last Name", value: lastName },
  { label: "Date of Birth", value: dob },
  { label: "Email", value: email },
  { label: "Gender", value: gender },
  { label: "Blood Group", value: bloodGroup },
  { label: "Phone Number", value: phoneNumber },
  { label: "Father's Name", value: fatherName },
  { label: "Mother's Name", value: motherName },
  { label: "Parent's Phone Number", value: parentPhoneNumber },
  { label: "Address", value: address },
];

const academicInfo = [
  { label: "Id", value: id },
  { label: "Enrollment Number", value: enrollmentNumber },
  { label: "Date of Admission", value: doa },
  { label: "Semester", value: semester },
  { label: "Pass Out Year", value: passOutYear },
  { label: "Department", value: department },
];
const personalInfo = [
  { label: "Full Name", value: fullName },
  { label: "First Name", value: firstName },
  { label: "Last Name", value: lastName },
  { label: "Date of Birth", value: dob },
  { label: "Email", value: email },
  { label: "Gender", value: gender },
  { label: "Blood Group", value: bloodGroup },
  { label: "Phone Number", value: phoneNumber },
  { label: "Father's Name", value: fatherName },
  { label: "Mother's Name", value: motherName },
  { label: "Parent's Phone Number", value: parentPhoneNumber },
  { label: "Address", value: address },
];

const academicInfo = [
  { label: "Id", value: id },
  { label: "Enrollment Number", value: enrollmentNumber },
  { label: "Date of Admission", value: doa },
  { label: "Semester", value: semester },
  { label: "Pass Out Year", value: passOutYear },
  { label: "Department", value: department },
  { label: "Designation", value: designation },
];

const [personalInfo, setPersonalInfo] = useState({
  isLoading: true,
});
const [academicInfo, setAcademicInfo] = useState({
  isLoading: true,
});

export default function Profile() {
  const getProfileData = async () => {
    try {
      const res = await fetchProfileData();
      const {}
    } catch (error) {}
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div className="profileContainer">
      <ServiceTitle serviceTitle="Personal details" />
      <div className="profileContentWrapper">
        <img className="profileImage" src={profileImage} alt="" />
        <div className="profileContent">
          <ProfileSection
            serviceSubTitle="Personal Information"
            profileDetails={personalInfo}
          />
          <ProfileSection
            serviceSubTitle="Academic Information"
            profileDetails={academicInfo}
          />
        </div>
      </div>
    </div>
  );
}
