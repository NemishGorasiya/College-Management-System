import "./Profile.scss";
import ServiceTitle from "./ServiceTitle";
import profileImage from "../assets/Nemish_Profile.jpg";
import ProfileSection from "./profile/ProfileSection";
import { formatDate, handleFallBackImage } from "../utils/utilityFunctions";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchProfileData } from "../services/services";
import fallbackProfileImageMale from "../assets/fallbackProfileImageMale.png";
import CloseIcon from "@mui/icons-material/Close";
import fallbackProfileImageFemale from "../assets/fallbackProfileImageFemale.png";
import {
	Box,
	Button,
	FormControl,
	IconButton,
	InputLabel,
	Modal,
	OutlinedInput,
	Stack,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { modalStyle } from "./modal/modalStyle";

export default function Profile() {
	const { userType } = useContext(AuthContext);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [personalInfo, setPersonalInfo] = useState({
		list: [],
		isLoading: true,
	});
	const [academicInfo, setAcademicInfo] = useState({
		list: [],
		isLoading: true,
	});

	const handleEditFormSubmit = (event) => {
		event.preventDefault();
		console.log("form submitted");
	};
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
				{ label: "Full Name", value: fullName, name: "fullName" },
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
		<>
			<div className="profileContainer">
				<ServiceTitle serviceTitle="Profile details" />
				<div className="profileContentWrapper">
					<div className="profileImageContainer">
						<img
							className="profileImage"
							src={profilePicture}
							alt=""
							onError={(event) => {
								handleFallBackImage(event, fallbackProfileImageMale);
							}}
						/>
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
						<FormControl variant="outlined" className="formControl">
							<InputLabel>sdoksd</InputLabel>
							<OutlinedInput />
						</FormControl>

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
		</>
	);
}
