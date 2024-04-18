import "./Profile.scss";
import ServiceTitle from "./ServiceTitle";
import profileImage from "../assets/Nemish_Profile.jpg";
import ProfileSection from "./profile/ProfileSection";
import { formatDate } from "../utils/utilityFunctions";
import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchProfileData } from "../services/services";

export default function Profile() {
  const [personalInfo, setPersonalInfo] = useState({
    list: [],
    isLoading: true,
  });
  const [academicInfo, setAcademicInfo] = useState({
    list: [],
    isLoading: true,
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const getProfileData = async () => {
    try {
      const res = await fetchProfileData();
      const { user } = res;

      const personalInfo = [
        { label: "Full Name", value: user.fullName },
        { label: "Date of Birth", value: formatDate(user.dob) },
        { label: "Email", value: user.email },
        { label: "Gender", value: user.gender },
        { label: "Blood Group", value: user.bloodGroup },
        { label: "Phone Number", value: user.phoneNumber },
        { label: "Father's Name", value: user.fatherName },
        { label: "Mother's Name", value: user.motherName },
        { label: "Parent's Phone Number", value: user.parentPhoneNumber },
        { label: "Address", value: user.address },
      ];
      const academicInfo = [
        { label: "Enrollment Number", value: user.enrollmentNumber },
        { label: "Date of Admission", value: formatDate(user.doa) },
        { label: "Semester", value: user.semester },
        { label: "Pass Out Year", value: user.passOutYear },
        // { label: "Department", value: user.department },
        { label: "Designation", value: user.designation },
      ];

      if (user.profilePicture) {
        setProfilePicture(user.profilePicture);
      }

      setPersonalInfo({
        list: personalInfo,
        isLoading: false,
      });
      setAcademicInfo({
        list: academicInfo,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div className="profileContainer">
      <ServiceTitle serviceTitle="Personal details" />
      <div className="profileContentWrapper">
        <img
          className="profileImage"
          src={profilePicture ?? profileImage}
          alt=""
        />
        <div className="profileContent">
          <ProfileSection
            serviceSubTitle="Personal Information"
            profileDetails={personalInfo.list}
            isLoading={personalInfo.isLoading}
          />
          <ProfileSection
            serviceSubTitle="Academic Information"
            profileDetails={academicInfo.list}
            isLoading={personalInfo.isLoading}
          />
        </div>
      </div>
    </div>
  );
}
