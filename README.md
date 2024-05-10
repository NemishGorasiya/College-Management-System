# College-Management-System

## User Module

Login for all will be different,

### Workflow

Admin will be inherently created => Admins will add Faculty => Faculty will add Students (will support bulk insertion using some method). => All the 3 users can login to their accounts.

Administrator will add departments

**Student** -

- `enrollmentNumber` : Unique identification number assigned to the student for enrollment.
- `name` : Name of the student.
- `dob`: Date of birth of the student.
- `doa` : Date of admission of the studen.
- `email` : Email address of the student, used for communication.
- `gender` : Gender of the student (options: "Male", "Female", "Other").
- `parentPhoneNumber` : Phone number of the student's parent or guardian.
- `bloodGroup` : Blood group of the student (options: "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-").
- `phoneNumber` : Phone number of the student.
- `address` : Address of the student's residence.
- `age` : Age of the student.
- `semester` : Semester in which the student is currently enrolled.
- `department` : Department of the current student.
- `passOutYear` : Year of the pass-out of the user.
- `profilePicture` : Profile Picture of the user.

  **Faculty** -

- `name` : Name of the faculty member.
- `department` : Department to which the faculty member is assigned.
- `address` : Address of the faculty member's residence or office.
- `phone_no` : Phone number of the faculty member.
- `email` : Email address of the faculty member.
- `designation` : Designation of the faculty member.
- `qualification` : Array of qualifications attained by the faculty member.
- `experience` : Number of years of teaching experience.
- `doj` : Date of joining (employment start date) of the faculty member.
- `dob` : Date of birth of the faculty member.
- `salary` : Salary of the faculty member.
- `semesters` : Semesters the faculty member is responsible for teaching.
- `subjects` : Subjects taught by the faculty member.
- `profilePicture` : Profile picture of the faculty.
- `isHOD`: true if the user is a HOD of the department.
  
**Admin:** -

- `email` : Email address of the admin, used for communication and password recovery. (String, Required, Unique)
- `fullName` : Full name of the admin. (String, Required)
- `phone` : Phone number of the admin for contact purposes. (String)
- `doj` : Date of joining of the admin.
-
- `isActive` : Indicates whether the admin account is currently active. (Boolean, Default: true)
- `profilePicture` : URL or file path to the admin's profile picture or avatar.

Department and Subject

**Department:**

- `name` : Name of the department.
- `departmentId` : Unique identifier for the department.
- `headOfDepartment` : Name or ID of the faculty member who heads the department. (virtuals) to be calculated by checking the one with isHOD flag ON
- `contactEmail` : Email address for contacting the department.
- `contactPhone` : Phone number for contacting the department.
- `officeLocation` : Location or office room number where the department is located within the college campus.
- `budget` : Budget allocated to the department for academic and administrative expenses.
- `researchAreas` : Areas of research or specialization within the department.
- `facilities` : List of facilities or resources available to students and faculty within the department (e.g., labs, libraries, equipment).
- `accreditation` : Accreditation status or certifications obtained by the department.
- `events` : Upcoming events or activities organized by the department.

**Subject:**

- `name` - Name of the subject
- `subject code` - Subject Code.
- `semester` - Semester of the subject.
- `department` - Department of the subject
- `description` - Description of the subject
- `credit` - Number of credits assigned to the subject.
- `hoursPerWeek` - Number of hourse per week.
- `resources` -    Additional resources or materials available to students for studying the subject (e.g., online lectures, tutorials).
- `syllabus` - will be added later.

**Exams:**

This schema represents an exam within a college management system.

- `name`: Name of the exam. (String, required)
- `description`: Description of the exam. (String, required)
- `totalMarks`: Total marks allocated for the exam. (Number, required)
- `subject`: Reference to the Subject schema representing the subject associated with the exam. (ObjectId, required)
- `examType`: Type of the exam, chosen from predefined options. (String, enum, required)
  - Valid options: "Mid-Semester", "End-Semester", "Quiz", "Assignment", "Lab", "Project", "Viva", "Other"
  - The totalMarks and exam type must be consistent according to the following rules:
    - Mid-Semester: 30 totalMarks
    - End-Semester: 70 totalMarks
    - Quiz: Total marks less than 100
    - Assignment: Total marks less than 100
    - Lab: 100 totalMarks
    - Project: 100 totalMarks
    - Viva: 20 totalMarks
- `date`: Date of the exam. (Date, required)
- `duration`: Duration of the exam in hours. (Number, required)

Additional features:

- `Validation`: The schema includes validation to ensure that the exam type and totalMarks are consistent.
- `Timestamps`: The schema automatically generates createdAt and updatedAt timestamps.

**ExamResult:**

This schema represents the result of an exam for a student within a college management system.

- `student`: Reference to the Student schema representing the student who took the exam. (ObjectId, required)
- `exam`: Reference to the Exam schema representing the exam for which the result is recorded. (ObjectId, required)
- `marks`: Marks obtained by the student in the exam. (Number, required)
- `percentage` (Virtual Field): Percentage of marks obtained by the student in the exam, calculated based on the total marks of the exam. (Virtual)
- `grade` (Virtual Field): Grade obtained by the student in the exam, determined based on the percentage of marks obtained. (Virtual)

Additional features:

- `Timestamps`: The schema automatically generates createdAt and updatedAt timestamps.
- `Virtual Fields`: The schema includes virtual fields to calculate the percentage and grade based on the marks obtained and the total marks of the exam.
- `JSON and Object Serialization`: The virtual fields are included in the JSON and Object representations of the schema.

**Final Result Schema:**

This schema represents the final result of a student for a semester within a college management system.

- `student`: Reference to the Student schema representing the student for whom the final result is recorded. (ObjectId, required)
- `semester`: Semester for which the final result is recorded. (Number, required)
- `examResults`: Array of references to ExamResult schema representing the individual exam results of the student for the semester. (Array of ObjectId, required)
- `achievedMarks` (Virtual Field): Total marks achieved by the student in all exams for the semester. (Virtual)
- `totalMarks` (Virtual Field): Total marks possible in all exams for the semester. (Virtual)
- `percentage` (Virtual Field): Percentage of marks achieved by the student in the semester. (Virtual)
- `grade` (Virtual Field): Grade obtained by the student in the semester based on the percentage of marks achieved. (Virtual)
- `spi` (Virtual Field): Semester Performance Index (SPI) calculated based on the percentage of marks achieved. (Virtual)

Additional features:

- `Timestamps`: The schema automatically generates createdAt and updatedAt timestamps.
- `Virtual Fields`: The schema includes virtual fields to calculate the achieved marks, total marks, percentage, grade, and SPI based on the exam results.
- `JSON and Object Serialization`: The virtual fields are included in the JSON and Object representations of the schema.
- `Aggregation`: Aggregation pipeline is used to compute the achieved marks and total marks from the individual exam results.

### Models

    - Student ✅
    - Faculty ✅
    - Admin ✅
    - Department ✅
    - Subject ✅
    - Exams ✅
    - ExamResult ✅
    - FinalResult✅
    - Assignments ✅
    - SubmittedAssignment ✅
    - Payment
    - Syllabus

    *Later additions*
    - Placement Records
    - Participating Companies
    - Recruiter login and other functionalities

### Exam module

    - Faculties can create Quizzes and other examinations individually.
    - They can create Quizzes and Project submissions
    - Updates can be applied to the exams by the creators and the admins
    - Result will be added by the faculties for the students.

  and

    - Hod of the subject will create exams for the Mid-Sems, Viva and Internal Examinations
    - It should happen by a button generate and a type of exam, starting and ending date - then we generate the exams.
    - Appropriate updates will be applied to the examinations by the HOD
    - Faculties of their particular subject will add the marks of the students by their enrollment no using excel sheet uploading 

### Result Module

- the result will be added for each and every exam

### Features to be added - Feature Request, Bug Report, Book Store, Forum

## Frontend

- Landing Page with College Introduction, Departments list, click on view details for the department, department details from GET /departments route
- When logged in show the students section with the data from the API:

We'll use `pnpm` for package management. checkout at [PNPM](https://pnpm.io/)


## changes -

- result populate
- subject
