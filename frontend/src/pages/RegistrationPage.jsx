import TopBar from "../components/TopBar";
import "./RegistrationPage.scss";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { bloodGroups, semesters } from "../constant/constatnt";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// {
//   "enrollmentNumber": 2002801070,
//   "firstName": "Mansi",
//   "lastName": "Sojitra",
//   "dob": "2003-08-01",
//   "doa": "2021-09-01",
//   "email": "mansi.sojitra@gmail.com",
//   "gender": "FEMALE",
//   "bloodGroup": "A+",
//   "phoneNumber": 9874103652,
//   "fatherName": "Sanjaybhai Sojitra",
//   "motherName": "Kiran Sojitra",
//   "parentPhoneNumber": 9876543201,
//   "address": "123 Main Street, Cityville",
//   "semester": 1,
//   "passOutYear": 2025,
//   "department": "660cdaff05dc0154e90275d8",
//   "password": "password123"
// }
const RegistrationPage = () => {
	const handleRegistration = (event) => {
		const form = event.target;
		const formData = new FormData(form);
		console.log("formData", formData);
	};
	return (
		<div className="registrationPage">
			<TopBar />
			<div className="contentWrapper">
				<div className="formContainer">
					<h2>Student Registration</h2>
					<form className="form" onSubmit={handleRegistration}>
						<div className="formControls">
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="enrollmentNumber">
									Enrollment No.
								</InputLabel>
								<OutlinedInput id="enrollmentNumber" label="Enrollment No." />
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="firstName">First Name</InputLabel>
								<OutlinedInput id="firstName" label="First Name" />
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="lastName">Last Name</InputLabel>
								<OutlinedInput id="lastName" label="Last Name" />
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="dob">Date of Birth</InputLabel>
								<OutlinedInput id="dob" label="Date of Birth" />
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker label="Basic date picker" />
								</LocalizationProvider>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="doa">Date of Admission</InputLabel>
								<OutlinedInput id="doa" label="Date of Admission" />
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="email">Email</InputLabel>
								<OutlinedInput id="email" label="Email" />
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="gender">Gender</InputLabel>
								<Select label="Gender" id="gender">
									<MenuItem key={1} value="male">
										Male
									</MenuItem>
									<MenuItem key={2} value="female">
										Female
									</MenuItem>
									<MenuItem key={3} value="other">
										Other
									</MenuItem>
								</Select>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="bloodGroup">Blood Group</InputLabel>
								<Select label="Blood Group" id="bloodGroup">
									{bloodGroups.map((bloodGroup, idx) => (
										<MenuItem key={idx} value={bloodGroup}>
											{bloodGroup}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
								<OutlinedInput id="phoneNumber" label="Phone Number" />
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="fatherName">Father Name</InputLabel>
								<OutlinedInput id="fatherName" label="Father Name" />
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="motherName">Mother Name</InputLabel>
								<OutlinedInput id="motherName" label="Mother Name" />
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="parentPhoneNumber">
									Parent Phone Number
								</InputLabel>
								<OutlinedInput
									id="parentPhoneNumber"
									label="Parent Phone Number"
								/>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="address">Address</InputLabel>
								<OutlinedInput id="address" label="Address" />
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="semester">Semester</InputLabel>
								<Select label="Semester" id="semester">
									{semesters.map((semester, idx) => (
										<MenuItem key={idx} value={semester}>
											{semester}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="department">Department</InputLabel>
								<OutlinedInput id="department" label="Department" />
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="password">Password</InputLabel>
								<OutlinedInput id="password" label="Password" />
							</FormControl>
						</div>
						<Stack className="submitBtnWrapper">
							<Button variant="contained">Register</Button>
						</Stack>
					</form>
				</div>
			</div>
		</div>
	);
};

export default RegistrationPage;
