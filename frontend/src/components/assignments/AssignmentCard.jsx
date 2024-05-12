import { Link } from "react-router-dom";
import { formatDate } from "../../utils/utilityFunctions";
import "./AssignmentCard.scss";
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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { modalStyle } from "../modal/modalStyle";
import { useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
import { handleUploadAssignment, uploadFile } from "../../services/services";
import toast from "react-hot-toast";

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

const AssignmentCard = ({
	assignment,
	isDetailedCard,
	uploadAssignment,
	showAssignment,
	getAssignments,
}) => {
	const [open, setOpen] = useState(false);
	const [file, setFile] = useState();
	const handleOpen = (event) => {
		event.stopPropagation();
		event.preventDefault();
		setOpen(true);
	};
	const handleClose = () => setOpen(false);
	const [isAssignmentUploading, setIsAssignmentUploading] = useState(false);

	const {
		_id: assignmentId,
		name: assignmentTitle,
		totalMarks,
		description,
		subject,
		dueDate,
		noOfStudentsSubmitted = 0,
		noOfStudentsNotSubmitted = 0,
	} = assignment;

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		formData.append("file", file);
		setIsAssignmentUploading(true);
		try {
			const response = await uploadFile(formData);
			const {
				response: { secure_url },
			} = response;
			const res = await handleUploadAssignment({
				assignmentData: { file: secure_url },
				assignmentId: assignmentId,
			});
			if (res) {
				getAssignments();
				toast.success("Assignment uploaded successfully");
				handleClose();
			}
		} catch (error) {
			toast.error("Something went wrong while uploading circular");
		} finally {
			setIsAssignmentUploading(false);
		}
	};

	let subjectName = typeof subject === "string" ? subject : subject.name;
	return (
		<>
			<Link to={`/assignment/${assignmentId}`}>
				<div className="assignmentCardWrapper">
					<p className="assignmentTitle">{assignmentTitle}</p>
					{isDetailedCard && (
						<p className="assignmentDetail">
							<span className="assignmentDetailLabel">Description : </span>
							<span className="assignmentDetailValue">{description}</span>
						</p>
					)}

					<p className="assignmentDetail">
						<span className="assignmentDetailLabel">Subject : </span>
						<span className="assignmentDetailValue">{subjectName}</span>
					</p>
					<p className="assignmentDetail">
						<span className="assignmentDetailLabel">Total Marks : </span>
						<span className="assignmentDetailValue">{totalMarks}</span>
					</p>
					<p className="assignmentDetail">
						<span className="assignmentDetailLabel">Due Date : </span>
						<span className="assignmentDetailValue">{formatDate(dueDate)}</span>
					</p>
					{uploadAssignment && (
						<Button
							sx={{ marginTop: "auto" }}
							variant="contained"
							startIcon={<CloudUploadIcon />}
							onClick={handleOpen}
						>
							Upload Assignment
						</Button>
					)}
					{isDetailedCard && (
						<>
							<p className="assignmentDetail">
								<span className="assignmentDetailLabel">
									No. of students submitted assignment :{" "}
								</span>
								<span className="assignmentDetailValue">
									{noOfStudentsSubmitted}
								</span>
							</p>
							<p className="assignmentDetail">
								<span className="assignmentDetailLabel">
									No. of students not submitted assignment :{" "}
								</span>
								<span className="assignmentDetailValue">
									{noOfStudentsNotSubmitted}
								</span>
							</p>
						</>
					)}
				</div>
			</Link>
			<Modal open={open}>
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
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "20px",
						}}
						onSubmit={handleFormSubmit}
					>
						<Button
							component="label"
							role={undefined}
							variant="contained"
							startIcon={<AttachFileIcon />}
							className="formControl"
							style={{ height: "56px" }}
						>
							Choose file
							<VisuallyHiddenInput
								type="file"
								onChange={(e) => setFile(e.target.files[0])}
							/>
						</Button>
						<LoadingButton
							type="submit"
							loading={isAssignmentUploading}
							loadingPosition="start"
							startIcon={<CloudUploadIcon />}
							variant="contained"
							style={{ height: "56px" }}
						>
							<span>Upload</span>
						</LoadingButton>
					</form>
				</Box>
			</Modal>
		</>
	);
};

export default AssignmentCard;
