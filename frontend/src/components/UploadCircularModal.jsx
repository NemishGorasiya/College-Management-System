import {
	Box,
	Button,
	FormControl,
	IconButton,
	InputLabel,
	Input,
	OutlinedInput,
	styled,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Modal from "@mui/material/Modal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import toast from "react-hot-toast";
import { uploadCircular, uploadFile } from "../services/services";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import "./UploadCircularModal.scss";
import { useState } from "react";
import { modalStyle } from "./modal/modalStyle.js";

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

const UploadCircularModal = ({ open, handleClose, getCirculars }) => {
	const [file, setFile] = useState();
	const [circularTitle, setCircularTitle] = useState("");
	const [isCircularUploading, setIsCircularUploading] = useState(false);

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		formData.append("file", file);
		setIsCircularUploading(true);
		try {
			const response = await uploadFile(formData);
			const {
				response: { secure_url },
			} = response;
			const res = await uploadCircular({
				title: circularTitle,
				link: secure_url,
			});
			if (res) {
				getCirculars();
				toast.success("Circular uploaded successfully");
				handleClose();
			}
		} catch (error) {
			toast.error("Something went wrong while uploading circular");
		} finally {
			setIsCircularUploading(false);
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
						<InputLabel htmlFor="enrollmentNumber">Circular Name</InputLabel>
						<OutlinedInput
							id="title"
							name="title"
							label="Circular Name"
							onChange={(e) => setCircularTitle(e.target.value)}
						/>
					</FormControl>
					<Button
						component="label"
						role={undefined}
						variant="contained"
						startIcon={<AttachFileIcon />}
						className="formControl"
					>
						Choose file
						<VisuallyHiddenInput
							type="file"
							onChange={(e) => setFile(e.target.files[0])}
						/>
					</Button>
					<LoadingButton
						type="submit"
						loading={isCircularUploading}
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
	);
};

export default UploadCircularModal;
