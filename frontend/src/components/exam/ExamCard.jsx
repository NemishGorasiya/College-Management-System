import "./ExamCard.scss";
import { modalStyle } from "../modal/modalStyle.js";
import { Box, Modal } from "@mui/material";
import { useState } from "react";

const ExamCard = ({ examDetails }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    name,
    examType,
    duration,
    results,
    subject,
    semester,
    totalMarks,
    date,
  } = examDetails;
  const { name: subjectName, credits } = subject;

  const handleCardClick = () => {
    handleOpen();
  };
  return (
    <div className="examCardWrapper" onClick={handleCardClick}>
      <div className="examDetailsWrapper">
        <p className="examTitle">{name}</p>
        <p className="examDate">{subjectName}</p>
        <p>Know More</p>
      </div>
      <Modal open={open} onClose={handleClose} className="uploadCircularModal">
        <Box sx={modalStyle}></Box>
      </Modal>
    </div>
  );
};

export default ExamCard;
