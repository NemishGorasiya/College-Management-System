import { formatDate } from "../../utils/utilityFunctions";
import { Button } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import "./SubmittedAssignmentCard.scss";

const SubmittedAssignmentCard = ({ submissionDetail }) => {
  const {
    student: { fullName, email },
    submission,
  } = submissionDetail;
  const { file, isLate, updatedAt } = submission ? submission : {};
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
      <a href={file} download target="_blank" className="downloadButtonWrapper">
        <Button
          className="downloadButton"
          component="label"
          variant="contained"
          startIcon={<PictureAsPdfIcon />}
        >
          Review Assignment
        </Button>
      </a>
    </div>
  );
};

export default SubmittedAssignmentCard;
