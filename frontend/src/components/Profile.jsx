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
			const {
				fullName,
				dob,
				email,
				gender,
				bloodGroup,
				phoneNumber,
				fatherName,
				motherName,
				parentPhoneNumber,
				address,
				enrollmentNumber,
				doa,
				semester,
				passOutYear,
				department,
				designation,
				profilePicture,
			} = user;

			const personalInfo = [
				{ label: "Full Name", value: fullName },
				{ label: "Date of Birth", value: formatDate(dob) },
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
				{ label: "Enrollment Number", value: enrollmentNumber },
				{ label: "Date of Admission", value: formatDate(doa) },
				{ label: "Semester", value: semester },
				{ label: "Pass Out Year", value: passOutYear },
				// { label: "Department", value: department },
				{ label: "Designation", value: designation },
			];

			if (profilePicture) {
				setProfilePicture(profilePicture);
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
