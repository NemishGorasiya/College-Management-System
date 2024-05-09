import React from "react";
import { formatDate } from "../../utils/utilityFunctions";
import { Button } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const data = {
	student: {
		_id: "660ce687966f7f6303f10fe8",
		email: "naineelsoyantar@gmail.com",
		fullName: "undefined undefined",
		id: "660ce687966f7f6303f10fe8",
	},
	submission: {
		_id: "662639e20e0a86bdcbccac47",
		student: "660ce687966f7f6303f10fe8",
		assignment: "662639badb48e0e7d7ae7776",
		file:
			"https://res.cloudinary.com/dhjo1bmn7/image/upload/v1711083087/ClgMgmtSys/65f9342aa799f2fce4c02d40/invoice_5_04533_4612_ldhuae.pdf",
		isLate: false,
		createdAt: "2024-04-22T10:20:18.256Z",
		updatedAt: "2024-04-22T10:20:18.256Z",
		__v: 0,
		id: "662639e20e0a86bdcbccac47",
	},
	_id: "662639e20e0a86bdcbccac49",
	id: "662639e20e0a86bdcbccac49",
};

const SubmittedAssignmentCard = () => {
	const {
		student: { fullName, email },
		submission: { file, isLate, updatedAt },
	} = data;
	return (
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
				href="https://res.cloudinary.com/dhjo1bmn7/image/upload/v1711083087/ClgMgmtSys/65f9342aa799f2fce4c02d40/invoice_5_04533_4612_ldhuae.pdf"
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
					Download Assignment
				</Button>
			</a>
		</div>
	);
};

export default SubmittedAssignmentCard;
