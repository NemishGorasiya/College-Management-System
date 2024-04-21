import TopBar from "../components/TopBar";
import "./RegistrationPage.scss";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { allowedUsers, bloodGroups, semesters } from "../constant/constant.jsx";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { registerStudent } from "../services/services.js";
import { useSearchParams } from "react-router-dom";

const RegistrationPage = () => {
	const [searchParams] = useSearchParams();
	const userType = searchParams.get("user");
	// if (!allowedUsers.includes(userType)) {
	// 	console.error("Invalid user type:", userType);
	// 	return null;
	// }

	const handleRegistration = (event) => {
		event.preventDefault();
		const fd = new FormData(event.target);
		const acquisitionChannel = fd.getAll("acquisition");
		const data = Object.fromEntries(fd.entries());
		data.acquisition = acquisitionChannel;
		console.log(data);
		registerStudent({ data });
	};

	return (
		<div className="registrationPageWrapper">
			<div className="registrationPage">
				<div className="formContainer">
					<h2>{userType} Registration</h2>
					<form className="form" onSubmit={handleRegistration}>
						<div className="formControls">
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="enrollmentNumber">
									Enrollment No.
								</InputLabel>
								<OutlinedInput
									id="enrollmentNumber"
									name="enrollmentNumber"
									label="Enrollment No."
								/>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="firstName">First Name</InputLabel>
								<OutlinedInput
									id="firstName"
									name="firstName"
									label="First Name"
								/>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="lastName">Last Name</InputLabel>
								<OutlinedInput
									id="lastName"
									name="lastName"
									label="Last Name"
								/>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										id="dob"
										name="dob"
										format="YYYY-MM-DD"
										label="Date of Birth"
									/>
								</LocalizationProvider>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										id="doa"
										name="doa"
										format="YYYY-MM-DD"
										label="Date of Admission"
									/>
								</LocalizationProvider>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										label="PassOut Year"
										id="passOutYear"
										name="passOutYear"
										views={["year"]}
									/>
								</LocalizationProvider>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="email">Email</InputLabel>
								<OutlinedInput id="email" name="email" label="Email" />
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="gender">Gender</InputLabel>
								<Select label="Gender" id="gender" name="gender">
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
								<Select label="Blood Group" id="bloodGroup" name="bloodGroup">
									{bloodGroups.map((bloodGroup, idx) => (
										<MenuItem key={idx} value={bloodGroup}>
											{bloodGroup}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
								<OutlinedInput
									id="phoneNumber"
									name="phoneNumber"
									label="Phone Number"
								/>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="fatherName">Father Name</InputLabel>
								<OutlinedInput
									id="fatherName"
									name="fatherName"
									label="Father Name"
								/>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="motherName">Mother Name</InputLabel>
								<OutlinedInput
									id="motherName"
									name="motherName"
									label="Mother Name"
								/>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="parentPhoneNumber">
									Parent Phone Number
								</InputLabel>
								<OutlinedInput
									id="parentPhoneNumber"
									name="parentPhoneNumber"
									label="Parent Phone Number"
								/>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="address">Address</InputLabel>
								<OutlinedInput id="address" name="address" label="Address" />
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="semester">Semester</InputLabel>
								<Select label="Semester" id="semester" name="semester">
									{semesters.map((semester, idx) => (
										<MenuItem key={idx} value={semester}>
											{semester}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="department">Department</InputLabel>
								<OutlinedInput
									id="department"
									name="department"
									label="Department"
								/>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="password">Password</InputLabel>
								<OutlinedInput id="password" name="password" label="Password" />
							</FormControl>
						</div>
						<Stack className="submitBtnWrapper">
							<Button type="submit" variant="contained">
								Register
							</Button>
						</Stack>
					</form>
				</div>
			</div>
		</div>
	);
};

export default RegistrationPage;
