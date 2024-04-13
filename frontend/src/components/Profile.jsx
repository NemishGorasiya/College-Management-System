import "./Profile.scss";
import ServiceTitle from "./ServiceTitle";
import profileImage from "../assets/Nemish_Profile.jpg";
import ProfileSection from "./profile/ProfileSection";
import { formatDate } from "../utils/utilityFunctions";

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
	{ label: "First Name", value: user.firstName },
	{ label: "Last Name", value: user.lastName },
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
	{ label: "Semester", value: user.semester },
	{ label: "Pass Out Year", value: user.passOutYear },
	{ label: "Department", value: user.department },
];

export default function Profile() {
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
