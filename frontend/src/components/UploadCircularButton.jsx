import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { uploadCircular, uploadFile } from "../services/services";
import toast from "react-hot-toast";
import UploadCircularModal from "./UploadCircularModal.jsx";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";

const UploadCircularButton = ({ getCirculars }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<Button
				component="label"
				role={undefined}
				variant="contained"
				tabIndex={-1}
				startIcon={<CloudUploadIcon />}
				sx={{ marginBottom: "20px", height: "56px", width: "250px" }}
				onClick={handleOpen}
			>
				Upload New Circular
			</Button>
			<UploadCircularModal
				getCirculars={getCirculars}
				open={open}
				handleClose={handleClose}
			/>
		</>
	);
};

export default UploadCircularButton;
