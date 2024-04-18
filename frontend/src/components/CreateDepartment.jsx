import {
	Autocomplete,
	Chip,
	FormControl,
	InputLabel,
	OutlinedInput,
	Stack,
	TextField,
	Button,
} from "@mui/material";
import "./CreateDepartment.scss";
import TopBar from "./TopBar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

const CreateDepartment = () => {
	const [researchAreas, setResearchAreas] = useState([]);
	const [facilities, setFacilities] = useState([]);
	const [accreditation, setAccreditation] = useState([]);

	const handleFormSubmit = (event) => {
		event.preventDefault();
		const fd = new FormData(event.target);
		console.log(typeof researchAreas);
		fd.append("researchAreas", researchAreas);
		fd.append("facilities", facilities);
		fd.append("accreditation", accreditation);
		const acquisitionChannel = fd.getAll("acquisition");
		const data = Object.fromEntries(fd.entries());
		data.acquisition = acquisitionChannel;
		console.log(data);
	};
	return (
		<div className="createDepartment">
			<TopBar />
			<div className="contentWrapper">
				<div className="formContainer">
					<h2>Create Department</h2>
					<form className="form" onSubmit={handleFormSubmit}>
						<div className="formControls">
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="name">Department Name</InputLabel>
								<OutlinedInput id="name" name="name" label="Department Name" />
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="contactEmail">Contact Email</InputLabel>
								<OutlinedInput
									id="contactEmail"
									name="contactEmail"
									label="Contact Email"
								/>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="contactPhoneNumber">
									Contact Phone No.
								</InputLabel>
								<OutlinedInput
									id="contactPhoneNumber"
									name="contactPhoneNumber"
									label="Contact Phone No."
								/>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="officeAddress">Address</InputLabel>
								<OutlinedInput
									id="officeAddress"
									name="officeAddress"
									label="Address"
								/>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<InputLabel htmlFor="budget">Budget</InputLabel>
								<OutlinedInput id="budget" name="budget" label="Budget" />
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<Autocomplete
									multiple
									// id="tags-filled"
									options={[].map((option) => option.title)}
									freeSolo
									onChange={(event, value) => {
										setResearchAreas(value);
									}}
									id="researchAreas"
									name="researchAreas"
									renderTags={(value, getTagProps) =>
										value.map((option, index) => (
											<Chip
												variant="outlined"
												label={option}
												{...getTagProps({ index })}
											/>
										))
									}
									renderInput={(params) => (
										<TextField
											{...params}
											variant="outlined"
											label="Research Areas"
											placeholder="Research Areas"
										/>
									)}
								/>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<Autocomplete
									multiple
									// id="tags-filled"
									id="facilities"
									name="facilities"
									options={[].map((option) => option.title)}
									freeSolo
									onChange={(event, value) => {
										setFacilities(value);
									}}
									renderTags={(value, getTagProps) =>
										value.map((option, index) => (
											<Chip
												variant="outlined"
												label={option}
												{...getTagProps({ index })}
											/>
										))
									}
									renderInput={(params) => (
										<TextField
											{...params}
											variant="outlined"
											label="Facilities"
											placeholder="Facilities"
										/>
									)}
								/>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<Autocomplete
									multiple
									// id="tags-filled"
									id="accreditation"
									name="accreditation"
									options={[].map((option) => option.title)}
									freeSolo
									onChange={(event, value) => {
										setAccreditation(value);
									}}
									renderTags={(value, getTagProps) =>
										value.map((option, index) => (
											<Chip
												variant="outlined"
												label={option}
												{...getTagProps({ index })}
											/>
										))
									}
									renderInput={(params) => (
										<TextField
											{...params}
											variant="outlined"
											label="Accreditation"
											placeholder="Accreditation"
										/>
									)}
								/>
							</FormControl>
							<FormControl variant="outlined" className="formControl">
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										id="doe"
										name="doe"
										format="YYYY-MM-DD"
										label="Date of Establishment"
									/>
								</LocalizationProvider>
							</FormControl>
						</div>
						<Stack className="submitBtnWrapper">
							<Button type="submit" variant="contained">
								Create Department
							</Button>
						</Stack>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateDepartment;
