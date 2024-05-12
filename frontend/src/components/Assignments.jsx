import ServiceTitle from "./ServiceTitle";
import "./Assignments.scss";
import AssignmentCard from "./assignments/AssignmentCard";
import { useCallback, useContext, useEffect, useState } from "react";
import { fetchAssignments } from "../services/services";
import { AuthContext } from "../context/AuthContext";
import ServiceSubTitle from "./ServiceSubTitle";

export default function Assignments() {
	const [assignments, setAssignments] = useState({
		list: [],
		isLoading: true,
	});
	const { userType } = useContext(AuthContext);

	const { list, isLoading } = assignments;
	const { submittedAssignments, nonSubmittedAssignments } = list;

	const getAssignments = useCallback(async () => {
		let url;
		if (userType === "student") {
			url = "/student/assignments";
		} else {
			url = "/assignment";
		}
		try {
			const response = await fetchAssignments({ url });
			if (response) {
				setAssignments({
					list: response,
					isLoading: false,
				});
			}
		} catch (error) {
			console.error(error);
		}
	}, [userType]);

	useEffect(() => {
		getAssignments();
	}, [getAssignments]);

	return (
		<div className="assignments">
			<ServiceTitle serviceTitle="Assignments" />
			{isLoading ? (
				<h1>Loading...</h1>
			) : userType === "student" ? (
				<div className="assignmentsContentWrapper">
					<ServiceSubTitle serviceSubTitle={"Submitted Assignments"} />
					<div className="assignmentsContainer">
						{submittedAssignments.length > 0 ? (
							submittedAssignments.map((assignment) => (
								<AssignmentCard
									key={assignment.id}
									assignment={assignment}
									showAssignment={true}
								/>
							))
						) : (
							<h1>No submitted assignments found</h1>
						)}
					</div>
					<ServiceSubTitle serviceSubTitle={"Not Submitted Assignments"} />
					<div className="assignmentsContainer">
						{nonSubmittedAssignments.length > 0 ? (
							nonSubmittedAssignments.map((assignment) => (
								<AssignmentCard
									uploadAssignment={true}
									key={assignment.id}
									getAssignments={getAssignments}
									assignment={assignment}
								/>
							))
						) : (
							<h1>Not submitted any assignment yet</h1>
						)}
					</div>
				</div>
			) : (
				<div className="assignmentsContentWrapper">
					<div className="assignmentsContainer">
						{list.map((assignment) => (
							<AssignmentCard key={assignment.id} assignment={assignment} />
						))}
					</div>
				</div>
			)}
		</div>
	);
}
