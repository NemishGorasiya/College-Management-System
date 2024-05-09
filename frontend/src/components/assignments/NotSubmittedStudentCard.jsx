const data = {
	_id: "661d626e34a7b33f7b626bb6",
	enrollmentNumber: 2002801077,
	firstName: "Mansii",
	lastName: "Sojitra",
	dob: "2003-08-01T00:00:00.000Z",
	doa: "2021-09-01T00:00:00.000Z",
	email: "mansiojitra@gmail.com",
	gender: "FEMALE",
	bloodGroup: "A+",
	phoneNumber: 9874103652,
	fatherName: "Sanjaybhai Sojitra",
	motherName: "Kiran Sojitra",
	parentPhoneNumber: 9876543201,
	address: "123 Main Street, Cityville",
	semester: 1,
	passOutYear: 2025,
	department: "660cdaff05dc0154e90275d8",
	createdAt: "2024-04-15T17:22:54.957Z",
	updatedAt: "2024-04-15T17:22:54.957Z",
	age: 21,
	__v: 0,
	fullName: "Mansii Sojitra",
	id: "661d626e34a7b33f7b626bb6",
};

const NotSubmittedStudentCard = () => {
	const { enrollmentNumber, fullName } = data;
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
