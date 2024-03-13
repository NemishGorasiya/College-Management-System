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
- `﻿doa` : Date of admission of the studen.
- `email` : Email address of the student, used for communication.
- `gender` : Gender of the student (options: "Male", "Female", "Other").
- `parentPhoneNumber` : Phone number of the student's parent or guardian.
- `bloodGroup` : Blood group of the student (options: "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-").
- `phoneNumber` : Phone number of the student.
- `address` : Address of the student's residence.
- `age` : Age of the student.
- `semester` : Semester in which the student is currently enrolled.
- `﻿department` : Department of the current student.
- `﻿passOutYear` : Year of the pass-out of the user.
- `﻿profilePicture` : Profile Picture of the user.

**Faculty / Admin(privileged user)** -

- `name` : Name of the faculty member.
- `department` : Department to which the faculty member is assigned.
- `address` : Address of the faculty member's residence or office.
- `phone_no` : Phone number of the faculty member.
- `email` : Email address of the faculty member.
- `qualification` : Array of qualifications attained by the faculty member.
- `experience` : Number of years of teaching experience.
- `doj` : Date of joining (employment start date) of the faculty member.
- `dob` : Date of birth of the faculty member.
- `salary` : Salary of the faculty member.
- `semesters` : Semesters the faculty member is responsible for teaching.
- `subjects` : Subjects taught by the faculty member.
- `﻿profilePicture` : Profile picture of the faculty.
  
**Admin:** -

- `email` : Email address of the admin, used for communication and password recovery. (String, Required, Unique)
- `fullName` : Full name of the admin. (String, Required)
- `phone` : Phone number of the admin for contact purposes. (String)
- `doj` : Date of joining of the admin.
- 
- `isActive` : Indicates whether the admin account is currently active. (Boolean, Default: true)
- `﻿profilePicture` : URL or file path to the admin's profile picture or avatar.

### Models
    - Student ✅
    - Faculty ✅
    - Admin ✅
    - Department
    - Subject
    - Result
    - Exams
    - Payment
    - Syllabus

    *Later additions*
    - Placement Records
    - Participating Companies
    - Recruiter login and other functionalities

    
We'll use `pnpm` for package management. checkout at [PNPM](https://pnpm.io/)
