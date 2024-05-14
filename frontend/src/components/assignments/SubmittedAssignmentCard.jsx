import { formatDate } from "../../utils/utilityFunctions";
import {
	Box,
	Button,
	FormControl,
	IconButton,
	InputLabel,
	Modal,
	OutlinedInput,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import "./SubmittedAssignmentCard.scss";
import CloseIcon from "@mui/icons-material/Close";
import { modalStyle } from "../modal/modalStyle";
import { useContext, useState } from "react";
import { updateAssignmnetMarks } from "../../services/services";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const SubmittedAssignmentCard = ({ submissionDetail }) => {
	const {
		student: { fullName, email },
		submission,
	} = submissionDetail;
	const [open, setOpen] = useState(false);
	const [marks, setMarks] = useState("");
	const { userType } = useContext(AuthContext);

	const handleMarksChange = ({ target: { value } }) => {
		setMarks(value);
	};
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const { file, isLate, updatedAt, id: submissionId } = submission
		? submission
		: {};

	const submitMarks = async () => {
		const data = {
			marks: marks,
		};
		try {
			const res = await updateAssignmnetMarks({ submissionId, data });
			if (res) {
				if (res.status === 500) {
					toast.error("Enter valid marks between 0 and 100");
				} else if (res.status === 200) {
					toast.success(res.data.message);
				} else {
					toast.error("Something went wrong while submitting marks");
				}
			} else {
				toast.error("Something went wrong while submitting marks");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className="submittedAssignmentCardWrapper">
				<p className="studentName">{email}</p>
				{/* email will replace by fullName */}
				<p className="submissionDetail">
					<span className="submissionDetailLabel">Uploaded At : </span>
					<span className="submissionDetailValue">{formatDate(updatedAt)}</span>
				</p>
				<p className="submissionDetail">
					<span className="submissionDetailLabel">Status : </span>
					<span
						className="submissionDetailValue status"
						style={{ background: isLate ? "#FF7F7F" : "#90EE90" }}
					>
						{isLate ? "Late" : "On Time"}
					</span>
				</p>
				<a
					href={file}
					download
					target="_blank"
					className="downloadButtonWrapper"
				>
					<Button
						className="downloadButton"
						component="label"
						variant="contained"
						startIcon={<PictureAsPdfIcon />}
					>
						View Assignment
					</Button>
				</a>
				{userType === "faculty" && (
					<Button
						className="downloadButton"
						component="label"
						variant="contained"
						onClick={handleOpen}
					>
						Give Marks
					</Button>
				)}
			</div>
			<Modal open={open} className="editProfileModal">
				<Box
					className="dialogBox"
					sx={{
						...modalStyle,
						display: "flex",
						flexDirection: "column",
						gap: "20px",
					}}
				>
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
					<h1 style={{ fontWeight: "600" }}>Give Marks</h1>
					<h1>{email}</h1>
					<FormControl variant="outlined">
						<InputLabel htmlFor="marks">Marks</InputLabel>
						<OutlinedInput
							id="marks"
							name="marks"
							label="marks"
							value={marks}
							onChange={handleMarksChange}
						/>
					</FormControl>
					<Button
						className="downloadButton"
						component="label"
						variant="contained"
						onClick={submitMarks}
						style={{ height: "56px" }}
					>
						Submit
					</Button>
				</Box>
			</Modal>
		</>
	);
};

export default SubmittedAssignmentCard;
