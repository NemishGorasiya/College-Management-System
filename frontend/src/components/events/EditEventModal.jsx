import {
	Box,
	Button,
	FormControl,
	IconButton,
	InputLabel,
	Modal,
	OutlinedInput,
	styled,
} from "@mui/material";
import React, { useState } from "react";
import { modalStyle } from "../modal/modalStyle";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { createNewEvent, editEvent, uploadFile } from "../../services/services";
import toast from "react-hot-toast";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { convertToISO } from "../../utils/utilityFunctions";
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

const EditEventModal = ({ open, handleClose, getEvents, eventDetails }) => {
	const [file, setFile] = useState();
	const [isEventUploading, setIsEventUploading] = useState();
	const { _id, description, endDate, name, poster, startDate } = eventDetails;

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		let secure_url = poster;
		if (file) {
			const formData = new FormData();
			formData.append("file", file);
			setIsEventUploading(true);
			const res = await uploadFile(formData);
			secure_url = res.response.secure_url;
			formData.delete("file");
		}
		try {
			const formData = new FormData(event.target);
			const data = Object.fromEntries(formData.entries());
			data.poster = secure_url;
			data.startDate = data.startDate
				? convertToISO(data.startDate)
				: startDate;
			data.endDate = data.endDate ? convertToISO(data.endDate) : endDate;

			const res = await editEvent({ data, eventId: _id });
			if (res) {
				toast.success("Event Added successfully");
				getEvents();
				setTimeout(() => {
					handleClose();
				}, 1000);
			}
		} catch (error) {
			toast.error("Something went wrong");
		} finally {
			setIsEventUploading(false);
		}
	};

	return (
		<Modal open={open} className="uploadCircularModal">
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
				<form action="" onSubmit={handleFormSubmit}>
					<FormControl variant="outlined" className="formControl">
						<InputLabel htmlFor="name">Event Title</InputLabel>
						<OutlinedInput
							defaultValue={name}
							id="name"
							name="name"
							label="Event Title"
						/>
					</FormControl>
					<FormControl variant="outlined" className="formControl">
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								id="startDate"
								name="startDate"
								format="YYYY-MM-DD"
								label="Event Start Date"
							/>
						</LocalizationProvider>
					</FormControl>
					<FormControl variant="outlined" className="formControl">
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								id="endDate"
								name="endDate"
								format="YYYY-MM-DD"
								label="Event End Date"
							/>
						</LocalizationProvider>
					</FormControl>
					<FormControl variant="outlined" className="formControl">
						<InputLabel htmlFor="description">Event Description</InputLabel>
						<OutlinedInput
							id="description"
							name="description"
							label="Event Description"
							defaultValue={description}
						/>
					</FormControl>
					<Button
						component="label"
						role={undefined}
						variant="contained"
						startIcon={<AttachFileIcon />}
						className="formControl"
					>
						Choose Event Poster
						<VisuallyHiddenInput
							type="file"
							accept="image/*"
							onChange={(e) => setFile(e.target.files[0])}
						/>
					</Button>
					<LoadingButton
						type="submit"
						loading={isEventUploading}
						loadingPosition="start"
						variant="contained"
						style={{ height: "56px" }}
					>
						<span>Edit Event</span>
					</LoadingButton>
				</form>
			</Box>
		</Modal>
	);
};

export default EditEventModal;
