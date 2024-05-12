import ServiceSubTitle from "../ServiceSubTitle";
import ServiceTitle from "../ServiceTitle";
import SubmittedAssignmentCard from "./SubmittedAssignmentCard";
import "./AssignmentSubmissions.scss";
import NotSubmittedStudentCard from "./NotSubmittedStudentCard";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { fetchAssignmentSubmissionDetails } from "../../services/services";
import AssignmentCard from "./AssignmentCard";
import { AuthContext } from "../../context/AuthContext";

const AssignmentSubmissions = () => {
	const { assignmentId } = useParams();

	const [assignmentDetail, setAssignmentDetail] = useState({
		data: {},
		isLoading: true,
	});

	const { data, isLoading } = assignmentDetail;

	const { assignment: assignmentData } = data;
	const { assignment: { students: submittedStudentsList } = {} } = data;
	const { nonSubmittedStudents } = data;

	const assignmentDetailsForCard = {
		id: assignmentData?.id,
		name: assignmentData?.name,
		description: assignmentData?.description,
		totalMarks: assignmentData?.totalMarks,
		subject: { name: assignmentData?.subject?.name },
		dueDate: assignmentData?.dueDate,
		noOfStudentsSubmitted: assignmentData?.students?.length,
		noOfStudentsNotSubmitted: nonSubmittedStudents?.length,
	};

	const getAssignmentSubmissionDetails = async (assignmentId) => {
		try {
			const response = await fetchAssignmentSubmissionDetails(assignmentId);
			if (response) {
				setAssignmentDetail({
					data: response,
					isLoading: false,
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getAssignmentSubmissionDetails(assignmentId);
	}, [assignmentId]);

	return (
		<div className="assignmentsSubmissions">
			<ServiceTitle serviceTitle="Assignment Submissions" />
			<div className="assignmentSubmissionsContentWrapper">
				<AssignmentCard assignment={assignmentDetailsForCard} isDetailedCard />
				<div className="submittedAssignmentsWrapper">
					<ServiceSubTitle serviceSubTitle={"Submitted Assignments"} />
					{isLoading ? (
						<h1>Loading...</h1>
					) : (
						<div className="cardsWrapper">
							{submittedStudentsList.length > 0 ? (
								submittedStudentsList.map((submissionDetail) => (
									<SubmittedAssignmentCard
										key={submissionDetail.submission?.id}
										submissionDetail={submissionDetail}
									/>
								))
							) : (
								<h1>No data found</h1>
							)}
						</div>
					)}
				</div>
				<div className="notSubmittedStudentsWrapper">
					<ServiceSubTitle
						serviceSubTitle={"Students who has not submitted "}
					/>
					{isLoading ? (
						<h1>Loading...</h1>
					) : (
						<div className="cardsWrapper">
							{nonSubmittedStudents.length > 0 ? (
								nonSubmittedStudents.map((student) => (
									<NotSubmittedStudentCard key={student.id} student={student} />
								))
							) : (
								<h1>No data found</h1>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AssignmentSubmissions;
