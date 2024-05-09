import ServiceSubTitle from "../ServiceSubTitle";
import ServiceTitle from "../ServiceTitle";
import SubmittedAssignmentCard from "./SubmittedAssignmentCard";
import "./AssignmentSubmissions.scss";
import NotSubmittedStudentCard from "./NotSubmittedStudentCard";

const AssignmentSubmissions = () => {
	return (
		<div className="assignmentsSubmissions">
			<ServiceTitle serviceTitle="Assignment Submissions" />
			<div className="assignmentSubmissionsContentWrapper">
				<div className="submittedAssignmentsWrapper">
					<ServiceSubTitle serviceSubTitle={"Submitted Assignments"} />
					<div className="cardsWrapper">
						<SubmittedAssignmentCard />
						<SubmittedAssignmentCard />
						<SubmittedAssignmentCard />
						<SubmittedAssignmentCard />
						<SubmittedAssignmentCard />
						<SubmittedAssignmentCard />
					</div>
				</div>
				<div className="notSubmiitedStudentsWrapper">
					<ServiceSubTitle
						serviceSubTitle={"Students who has not submitted "}
					/>
					<div className="cardsWrapper">
						<NotSubmittedStudentCard />
						<NotSubmittedStudentCard />
						<NotSubmittedStudentCard />
						<NotSubmittedStudentCard />
						<NotSubmittedStudentCard />
						<NotSubmittedStudentCard />
						<NotSubmittedStudentCard />
						<NotSubmittedStudentCard />
						<NotSubmittedStudentCard />
						<NotSubmittedStudentCard />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AssignmentSubmissions;
