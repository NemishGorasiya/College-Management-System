import { Link } from "react-router-dom";
import { formatDate } from "../../utils/utilityFunctions";
import "./AssignmentCard.scss";

const AssignmentCard = ({ assignment, isDetailedCard }) => {
	const {
		id: assignmentId,
		name: assignmentTitle,
		totalMarks,
		description,
		subject,
		dueDate,
		noOfStudentsSubmitted = 0,
		noOfStudentsNotSubmitted = 0,
	} = assignment;

	let subjectName = typeof subject === "string" ? subject : subject.name;
	return (
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
	);
};

export default AssignmentCard;
