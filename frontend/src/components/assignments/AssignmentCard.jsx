import { formatDate } from "../../utils/utilityFunctions";

const data = {
	_id: "663d139ba6e4aec71f39159d",
	name: "Java Assignment",
	description: "Create Full stack E-Commerce Website in Java",
	totalMarks: 100,
	subject: {
		_id: "660ce009ac1849cc24a29470",
		name: "Introduction to Machine Learning",
		subjectCode: 3010701,
		department: "660cdaff05dc0154e90275d8",
		semester: 1,
		description:
			"An introductory course covering basic concepts of machine learning",
		credits: 3,
		hoursPerWeek: 4,
		resources: [
			{
				name: "Course Textbook",
				link: "http://example.com/textbook",
				description: "Required reading material for the course",
				_id: "660ce009ac1849cc24a29471",
				createdAt: "2024-04-03T04:50:17.008Z",
				updatedAt: "2024-04-03T04:50:17.008Z",
				id: "660ce009ac1849cc24a29471",
			},
			{
				name: "Online Lectures",
				link: "http://example.com/lectures",
				description: "Recorded lectures covering course topics",
				_id: "660ce009ac1849cc24a29472",
				createdAt: "2024-04-03T04:50:17.008Z",
				updatedAt: "2024-04-03T04:50:17.008Z",
				id: "660ce009ac1849cc24a29472",
			},
		],
		createdAt: "2024-04-03T04:50:17.008Z",
		updatedAt: "2024-04-03T04:50:17.008Z",
		__v: 0,
		id: "660ce009ac1849cc24a29470",
	},
	dueDate: "2024-07-25T00:00:00.000Z",
	faculty: "660cf59ed2d4598cb3fbc838",
	students: [],
	id: "663d139ba6e4aec71f39159d",
};

const AssignmentCard = () => {
	const {
		name: assignmentTitle,
		totalMarks,
		subject: { name: subjectName },
		dueDate,
	} = data;
	return (
		<div className="assignmentCardWrapper">
			<p className="assignmentTitle">{assignmentTitle}</p>
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
		</div>
	);
};

export default AssignmentCard;
