import "./NotSubmittedStudentCard.scss";

const NotSubmittedStudentCard = ({ student }) => {
  const { enrollmentNumber, fullName } = student;
  return (
    <div className="notSubmittedStudentCardWrapper">
      <div className="studentDetail">
        <div className="studentDetailLabel">Enrollment Number</div>
        <div className="studentDetailValue">{enrollmentNumber}</div>
      </div>
      <div className="studentDetail">
        <div className="studentDetailLabel">Name</div>
        <div className="studentDetailValue">{fullName}</div>
      </div>
    </div>
  );
};

export default NotSubmittedStudentCard;
