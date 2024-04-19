import { useCallback, useEffect, useState } from "react";
import "./ResultCard.scss";
import { fetchSubjectDetails } from "../services/services";
import { Box, IconButton, Modal, OutlinedInput } from "@mui/material";
import { modalStyle } from "./modal/modalStyle";
import CloseIcon from "@mui/icons-material/Close";
import { formatDate } from "../utils/utilityFunctions";

const ResultCard = ({ result }) => {
  const [subjectDetails, setSubjectDetails] = useState({});
  const { id, examType, marks, grade, exam } = result;
  const { name: examTitle, totalMarks, subject: subjectId, date } = exam;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { name: subjectName, subjectCode, credits } = subjectDetails || {};
  const getSubjectDetails = useCallback(async (subjectId) => {
    try {
      const res = await fetchSubjectDetails(subjectId);
      const { subject } = res;
      if (res) {
        setSubjectDetails(subject);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getSubjectDetails(subjectId);
  }, [getSubjectDetails, subjectId]);
  return (
    <>
      <div className="resultCardWrapper" onClick={handleOpen}>
        <div className="resultDetailsWrapper">
          <p className="examName">{examTitle}</p>
          <p className="resultDetail">
            <span className="resultDetailLabel">Subject : </span>
            <span className="resultDetailValue">{subjectName}</span>
          </p>

          <p className="resultDetail">
            <span className="resultDetailLabel">Obtained Marks : </span>
            <span className="resultDetailValue">{marks}</span>
          </p>
        </div>
      </div>
      <Modal open={open} onClose={handleClose} className="resultDetailsModal">
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
          <p className="examName">{examTitle}</p>
          <p className="resultDetail">
            <span className="resultDetailLabel">Subject : </span>
            <span className="resultDetailValue">{subjectName}</span>
          </p>
          <p className="resultDetail">
            <span className="resultDetailLabel">Subject Code : </span>
            <span className="resultDetailValue">{subjectCode}</span>
          </p>
          <p className="resultDetail">
            <span className="resultDetailLabel">Credits : </span>
            <span className="resultDetailValue">{credits}</span>
          </p>
          <p className="resultDetail">
            <span className="resultDetailLabel">Obtained Marks : </span>
            <span className="resultDetailValue obtainedMarks">{marks}</span>
          </p>
          <p className="resultDetail">
            <span className="resultDetailLabel">Total Marks : </span>
            <span className="resultDetailValue">{totalMarks}</span>
          </p>
          <p className="resultDetail">
            <span className="resultDetailLabel">Grade : </span>
            <span className="resultDetailValue">{grade}</span>
          </p>
          <p className="resultDetail">
            <span className="resultDetailLabel">Exam Date : </span>
            <span className="resultDetailValue">{formatDate(date)}</span>
          </p>
          <p className="resultDetail">
            <span className="resultDetailLabel">Exam Type : </span>
            <span className="resultDetailValue">{examType}</span>
          </p>
        </Box>
      </Modal>
    </>
  );
};

export default ResultCard;
