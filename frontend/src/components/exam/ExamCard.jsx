import "./ExamCard.scss";
import { modalStyle } from "../modal/modalStyle.js";
import { Box, IconButton, Modal } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { DateToTime, formatDate } from "../../utils/utilityFunctions.js";

const ExamCard = ({ examDetails }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    name,
    examType,
    duration,
    subject,
    totalMarks,
    date,
    faculty,
    results,
  } = examDetails;
  const { name: subjectName, subjectCode } = subject;
  const { firstName, lastName, email: facultyEmail } = faculty;

  const facultyName = `${firstName} ${lastName}`;
  const { marks } = results[0] || {};

  const handleCardClick = () => {
    handleOpen();
  };
  return (
    <>
      <div className="examCardWrapper" onClick={handleCardClick}>
        <div className="examDetailsWrapper">
          <p className="examName">{name}</p>
          <p className="subjectName">{subjectName}</p>
          <p>Know More</p>
        </div>
      </div>
      <Modal open={open} onClose={handleClose} className="examDetailsModal">
        <Box sx={modalStyle}>
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
          <p className="examTitle">{name}</p>
          <p className="examDetail">
            <span className="examDetailLabel">Subject : </span>
            {subjectName}
          </p>
          <p className="examDetail">
            <span className="examDetailLabel">Subject code : </span>
            {subjectCode}
          </p>
          <p className="examDetail">
            <span className="examDetailLabel">Total Marks : </span>
            {totalMarks}
          </p>
          <p className="examDetail">
            <span className="examDetailLabel">date : </span> {formatDate(date)}
          </p>
          <p className="examDetail">
            <span className="examDetailLabel">Time : </span> {DateToTime(date)}
          </p>
          <p className="examDetail">
            <span className="examDetailLabel">duration : </span> {duration}{" "}
            minutes
          </p>
          <p className="examDetail">
            <span className="examDetailLabel">Faculty name : </span>
            {facultyName}
          </p>
          <p className="examDetail">
            <span className="examDetailLabel">Faculty email : </span>
            <span className="facultyEmail">{facultyEmail}</span>
          </p>
          <p className="examDetail">
            <span className="examDetailLabel">Exam Type : </span>
            {examType}
          </p>
          <p className="examDetail">
            <span className="examDetailLabel">Result : </span>
            <span className="examResult">{marks ?? "pending"}</span>
          </p>
        </Box>
      </Modal>
    </>
  );
};

export default ExamCard;
