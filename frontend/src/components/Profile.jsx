import "./Profile.scss";
import ServiceTitle from "./ServiceTitle";
import profileImage from "../assets/Nemish_Profile.jpg";
import ProfileSection from "./profile/ProfileSection";
import { formatDate, handleFallBackImage } from "../utils/utilityFunctions";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchProfileData } from "../services/services";
import fallbackProfileImageMale from "../assets/fallbackProfileImageMale.png";
import fallbackProfileImageFemale from "../assets/fallbackProfileImageFemale.png";

export default function Profile() {
	const { userType } = useContext(AuthContext);
	const [personalInfo, setPersonalInfo] = useState({
		list: [],
		isLoading: true,
	});
	const [academicInfo, setAcademicInfo] = useState({
		list: [],
		isLoading: true,
	});
	const [profilePicture, setProfilePicture] = useState(null);
	const getProfileData = useCallback(async () => {
		try {
			const res = await fetchProfileData();
			const { user } = res;
			console.log("profile", user);
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
			} = user;

			let personalInfo = [
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
				// { label: "Date of Admission", value: formatDate(doa) },
				{ label: "Date of Joining", value: formatDate(doj) },
				{ label: "Semester", value: semester },
				{ label: "Pass Out Year", value: passOutYear },
				{ label: "Department", value: department.name },
				{ label: "Designation", value: designation },
			];

			if (userType === "admin") {
				personalInfo = [...personalInfo, ...academicInfo];
			}

			setProfilePicture(
				profilePicture ?? gender === "MALE"
					? fallbackProfileImageMale
					: fallbackProfileImageFemale
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
		<div className="profileContainer">
			<ServiceTitle serviceTitle="Profile details" />
			<div className="profileContentWrapper">
				<img
					className="profileImage"
					src={profilePicture}
					alt=""
					onError={(event) => {
						handleFallBackImage(event, fallbackProfileImageMale);
					}}
				/>
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
	);
}
