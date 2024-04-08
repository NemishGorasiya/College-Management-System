module.exports = {
    "_id": "6604faaaf826b3aaad847a77",
    "student": {
        "_id": "65f9342aa799f2fce4c02d40",
        "enrollmentNumber": 1230984567,
        "firstName": "Naineel",
        "lastName": "Soyantar",
        "dob": "1999-05-15T00:00:00.000Z",
        "doa": "2021-09-01T00:00:00.000Z",
        "email": "john.doe4@example.com",
        "gender": "MALE",
        "bloodGroup": "A+",
        "semester": 1,
        "passOutYear": 2023,
        "department": {
            "_id": "65f83397a59c175085c9103b",
            "name": "Computer Science Department",
            "id": "65f83397a59c175085c9103b"
        },
        "profilePicture": "http://example.com/john_doe.jpg",
        "fullName": "Naineel Soyantar",
        "id": "65f9342aa799f2fce4c02d40"
    },
    "semester": 1,
    "examResults": [
        {
            "_id": "66040f69e22ec7eeeaf4c535",
            "student": "65f9342aa799f2fce4c02d40",
            "exam": {
                "_id": "66040f0ae22ec7eeeaf4c4ff",
                "name": "Mid Semester 1",
                "description": "This is the mid semster exam for semester 1",
                "totalMarks": 30,
                "subject": {
                    "_id": "660264c7cc0b965b6a88c264",
                    "name": "Data Structures",
                    "subjectCode": 310704,
                    "credits": 3,
                    "id": "660264c7cc0b965b6a88c264"
                },
                "examType": "Mid-Semester",
                "date": "2024-03-28T00:00:00.000Z",
                "isCompleted": true,
                "id": "66040f0ae22ec7eeeaf4c4ff"
            },
            "marks": 25,
            "createdAt": "2024-03-27T12:22:01.972Z",
            "updatedAt": "2024-03-27T12:22:01.972Z",
            "examType": "Mid-Semester",
            "percentage": 83.33333333333334,
            "__v": 0,
            "grade": "A",
            "id": "66040f69e22ec7eeeaf4c535"
        },
        {
            "_id": "66040f83e22ec7eeeaf4c54a",
            "student": "65f9342aa799f2fce4c02d40",
            "exam": {
                "_id": "66040f0ae22ec7eeeaf4c503",
                "name": "Mid Semester 1",
                "description": "This is the mid semster exam for semester 1",
                "totalMarks": 30,
                "subject": {
                    "_id": "660264bbcc0b965b6a88c25f",
                    "name": "Database Management Systems",
                    "subjectCode": 310703,
                    "credits": 3,
                    "id": "660264bbcc0b965b6a88c25f"
                },
                "examType": "Mid-Semester",
                "date": "2024-03-29T00:00:00.000Z",
                "isCompleted": true,
                "id": "66040f0ae22ec7eeeaf4c503"
            },
            "marks": 25,
            "createdAt": "2024-03-27T12:22:27.295Z",
            "updatedAt": "2024-03-27T12:22:27.295Z",
            "examType": "Mid-Semester",
            "percentage": 83.33333333333334,
            "__v": 0,
            "grade": "A",
            "id": "66040f83e22ec7eeeaf4c54a"
        },
        {
            "_id": "66040f8fe22ec7eeeaf4c554",
            "student": "65f9342aa799f2fce4c02d40",
            "exam": {
                "_id": "66040f0ae22ec7eeeaf4c507",
                "name": "Mid Semester 1",
                "description": "This is the mid semster exam for semester 1",
                "totalMarks": 30,
                "subject": {
                    "_id": "6602649ecc0b965b6a88c250",
                    "name": "Introduction to Computer Fundamentals",
                    "subjectCode": 310701,
                    "credits": 3,
                    "id": "6602649ecc0b965b6a88c250"
                },
                "examType": "Mid-Semester",
                "date": "2024-04-01T00:00:00.000Z",
                "isCompleted": false,
                "id": "66040f0ae22ec7eeeaf4c507"
            },
            "marks": 25,
            "createdAt": "2024-03-27T12:22:39.968Z",
            "updatedAt": "2024-03-27T12:22:39.968Z",
            "examType": "Mid-Semester",
            "percentage": 83.33333333333334,
            "__v": 0,
            "grade": "A",
            "id": "66040f8fe22ec7eeeaf4c554"
        },
        {
            "_id": "66040f9de22ec7eeeaf4c55e",
            "student": "65f9342aa799f2fce4c02d40",
            "exam": {
                "_id": "66040f0ae22ec7eeeaf4c50b",
                "name": "Mid Semester 1",
                "description": "This is the mid semster exam for semester 1",
                "totalMarks": 30,
                "subject": {
                    "_id": "66026486cc0b965b6a88c24b",
                    "name": "Digital Fundamentals",
                    "subjectCode": 310702,
                    "credits": 3,
                    "id": "66026486cc0b965b6a88c24b"
                },
                "examType": "Mid-Semester",
                "date": "2024-04-02T00:00:00.000Z",
                "isCompleted": false,
                "id": "66040f0ae22ec7eeeaf4c50b"
            },
            "marks": 25,
            "createdAt": "2024-03-27T12:22:53.075Z",
            "updatedAt": "2024-03-27T12:22:53.075Z",
            "examType": "Mid-Semester",
            "percentage": 83.33333333333334,
            "__v": 0,
            "grade": "A",
            "id": "66040f9de22ec7eeeaf4c55e"
        }
    ],
    "examType": "Mid-Semester",
    "createdAt": "2024-03-28T05:05:47.585Z",
    "updatedAt": "2024-03-28T05:05:47.585Z",
    "achievedMarks": 100,
    "totalMarks": 120,
    "percentage": 83.33333333333334,
    "__v": 0,
    "grade": "A",
    "spi": 8.833333333333334,
    "id": "6604faaaf826b3aaad847a77"
}


const data = [
    {
        "_id": "66026b3631576e8f74c33660",
        "name": "Mid Semester 1",
        "description": "This is the mid semster exam for semester 1",
        "totalMarks": 30,
        "subject": {
            "_id": "660264c7cc0b965b6a88c264",
            "name": "Data Structures",
            "subjectCode": 310704,
            "department": "65f83397a59c175085c9103b",
            "semester": 1,
            "description": "Introduction to computer science fundamentals",
            "credits": 3,
            "hoursPerWeek": 4,
            "resources": [
                {
                    "name": "Course Textbook",
                    "link": "http://example.com/textbook",
                    "description": "Required reading material for the course",
                    "_id": "660264c7cc0b965b6a88c265",
                    "createdAt": "2024-03-26T06:01:43.295Z",
                    "updatedAt": "2024-03-26T06:01:43.295Z",
                    "id": "660264c7cc0b965b6a88c265"
                },
                {
                    "name": "Online Lectures",
                    "link": "http://example.com/lectures",
                    "description": "Recorded lectures covering course topics",
                    "_id": "660264c7cc0b965b6a88c266",
                    "createdAt": "2024-03-26T06:01:43.295Z",
                    "updatedAt": "2024-03-26T06:01:43.295Z",
                    "id": "660264c7cc0b965b6a88c266"
                }
            ],
            "createdAt": "2024-03-26T06:01:43.295Z",
            "updatedAt": "2024-03-26T06:01:43.295Z",
            "__v": 0,
            "id": "660264c7cc0b965b6a88c264"
        },
        "examType": "Mid-Semester",
        "date": "2024-04-01T00:00:00.000Z",
        "duration": 120,
        "faculty": {
            "_id": "65f928b0c76172e4b0ebe30d",
            "firstName": "Naineel",
            "lastName": "Soyantar",
            "department": "65f83397a59c175085c9103b",
            "designation": "PROFESSOR",
            "address": "123, Main St. City, Country",
            "phoneNumber": 9023031861,
            "email": "naineelsoyantar@gmail.com",
            "qualification": [
                "Bachelor's in Computer Engineering"
            ],
            "experience": 0,
            "dob": "2002-09-12T00:00:00.000Z",
            "doj": "2023-02-10T00:00:00.000Z",
            "salary": 1000000000000,
            "semesters": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8
            ],
            "subjects": [
                "65f91b5f1d8f9bc189e87142"
            ],
            "profilePicture": "",
            "isHOD": true,
            "createdAt": "2024-03-19T05:54:56.824Z",
            "updatedAt": "2024-03-25T05:01:07.822Z",
            "__v": 0,
            "fullName": "Naineel Soyantar",
            "id": "65f928b0c76172e4b0ebe30d"
        },
        "createdAt": "2024-03-26T06:29:10.255Z",
        "updatedAt": "2024-03-26T06:29:10.255Z",
        "__v": 0,
        "isCompleted": false,
        "id": "66026b3631576e8f74c33660"
    },
    {
        "_id": "66026a65b248577abbd85fab",
        "name": "Mid Semester 1",
        "description": "This is the mid semster exam for semester 1",
        "totalMarks": 30,
        "subject": {
            "_id": "660264c7cc0b965b6a88c264",
            "name": "Data Structures",
            "subjectCode": 310704,
            "department": "65f83397a59c175085c9103b",
            "semester": 1,
            "description": "Introduction to computer science fundamentals",
            "credits": 3,
            "hoursPerWeek": 4,
            "resources": [
                {
                    "name": "Course Textbook",
                    "link": "http://example.com/textbook",
                    "description": "Required reading material for the course",
                    "_id": "660264c7cc0b965b6a88c265",
                    "createdAt": "2024-03-26T06:01:43.295Z",
                    "updatedAt": "2024-03-26T06:01:43.295Z",
                    "id": "660264c7cc0b965b6a88c265"
                },
                {
                    "name": "Online Lectures",
                    "link": "http://example.com/lectures",
                    "description": "Recorded lectures covering course topics",
                    "_id": "660264c7cc0b965b6a88c266",
                    "createdAt": "2024-03-26T06:01:43.295Z",
                    "updatedAt": "2024-03-26T06:01:43.295Z",
                    "id": "660264c7cc0b965b6a88c266"
                }
            ],
            "createdAt": "2024-03-26T06:01:43.295Z",
            "updatedAt": "2024-03-26T06:01:43.295Z",
            "__v": 0,
            "id": "660264c7cc0b965b6a88c264"
        },
        "examType": "Mid-Semester",
        "date": "2024-04-01T00:00:00.000Z",
        "duration": 120,
        "faculty": {
            "_id": "65f928b0c76172e4b0ebe30d",
            "firstName": "Naineel",
            "lastName": "Soyantar",
            "department": "65f83397a59c175085c9103b",
            "designation": "PROFESSOR",
            "address": "123, Main St. City, Country",
            "phoneNumber": 9023031861,
            "email": "naineelsoyantar@gmail.com",
            "qualification": [
                "Bachelor's in Computer Engineering"
            ],
            "experience": 0,
            "dob": "2002-09-12T00:00:00.000Z",
            "doj": "2023-02-10T00:00:00.000Z",
            "salary": 1000000000000,
            "semesters": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8
            ],
            "subjects": [
                "65f91b5f1d8f9bc189e87142"
            ],
            "profilePicture": "",
            "isHOD": true,
            "createdAt": "2024-03-19T05:54:56.824Z",
            "updatedAt": "2024-03-25T05:01:07.822Z",
            "__v": 0,
            "fullName": "Naineel Soyantar",
            "id": "65f928b0c76172e4b0ebe30d"
        },
        "createdAt": "2024-03-26T06:25:41.581Z",
        "updatedAt": "2024-03-26T06:25:41.581Z",
        "__v": 0,
        "isCompleted": false,
        "id": "66026a65b248577abbd85fab"
    },
    {
        "_id": "66026a42a02e8d388322aea2",
        "name": "Mid Semester 1",
        "description": "This is the mid semster exam for semester 1",
        "totalMarks": 30,
        "subject": {
            "_id": "660264c7cc0b965b6a88c264",
            "name": "Data Structures",
            "subjectCode": 310704,
            "department": "65f83397a59c175085c9103b",
            "semester": 1,
            "description": "Introduction to computer science fundamentals",
            "credits": 3,
            "hoursPerWeek": 4,
            "resources": [
                {
                    "name": "Course Textbook",
                    "link": "http://example.com/textbook",
                    "description": "Required reading material for the course",
                    "_id": "660264c7cc0b965b6a88c265",
                    "createdAt": "2024-03-26T06:01:43.295Z",
                    "updatedAt": "2024-03-26T06:01:43.295Z",
                    "id": "660264c7cc0b965b6a88c265"
                },
                {
                    "name": "Online Lectures",
                    "link": "http://example.com/lectures",
                    "description": "Recorded lectures covering course topics",
                    "_id": "660264c7cc0b965b6a88c266",
                    "createdAt": "2024-03-26T06:01:43.295Z",
                    "updatedAt": "2024-03-26T06:01:43.295Z",
                    "id": "660264c7cc0b965b6a88c266"
                }
            ],
            "createdAt": "2024-03-26T06:01:43.295Z",
            "updatedAt": "2024-03-26T06:01:43.295Z",
            "__v": 0,
            "id": "660264c7cc0b965b6a88c264"
        },
        "examType": "Mid-Semester",
        "date": "2024-04-01T00:00:00.000Z",
        "duration": 120,
        "faculty": {
            "_id": "65f928b0c76172e4b0ebe30d",
            "firstName": "Naineel",
            "lastName": "Soyantar",
            "department": "65f83397a59c175085c9103b",
            "designation": "PROFESSOR",
            "address": "123, Main St. City, Country",
            "phoneNumber": 9023031861,
            "email": "naineelsoyantar@gmail.com",
            "qualification": [
                "Bachelor's in Computer Engineering"
            ],
            "experience": 0,
            "dob": "2002-09-12T00:00:00.000Z",
            "doj": "2023-02-10T00:00:00.000Z",
            "salary": 1000000000000,
            "semesters": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8
            ],
            "subjects": [
                "65f91b5f1d8f9bc189e87142"
            ],
            "profilePicture": "",
            "isHOD": true,
            "createdAt": "2024-03-19T05:54:56.824Z",
            "updatedAt": "2024-03-25T05:01:07.822Z",
            "__v": 0,
            "fullName": "Naineel Soyantar",
            "id": "65f928b0c76172e4b0ebe30d"
        },
        "createdAt": "2024-03-26T06:25:08.346Z",
        "updatedAt": "2024-03-26T06:25:08.346Z",
        "__v": 0,
        "isCompleted": false,
        "id": "66026a42a02e8d388322aea2"
    },
    {
        "_id": "66026b3631576e8f74c33663",
        "name": "Mid Semester 1",
        "description": "This is the mid semster exam for semester 1",
        "totalMarks": 30,
        "subject": {
            "_id": "660264bbcc0b965b6a88c25f",
            "name": "Database Management Systems",
            "subjectCode": 310703,
            "department": "65f83397a59c175085c9103b",
            "semester": 1,
            "description": "Introduction to computer science fundamentals",
            "credits": 3,
            "hoursPerWeek": 4,
            "resources": [
                {
                    "name": "Course Textbook",
                    "link": "http://example.com/textbook",
                    "description": "Required reading material for the course",
                    "_id": "660264bbcc0b965b6a88c260",
                    "createdAt": "2024-03-26T06:01:31.162Z",
                    "updatedAt": "2024-03-26T06:01:31.162Z",
                    "id": "660264bbcc0b965b6a88c260"
                },
                {
                    "name": "Online Lectures",
                    "link": "http://example.com/lectures",
                    "description": "Recorded lectures covering course topics",
                    "_id": "660264bbcc0b965b6a88c261",
                    "createdAt": "2024-03-26T06:01:31.162Z",
                    "updatedAt": "2024-03-26T06:01:31.162Z",
                    "id": "660264bbcc0b965b6a88c261"
                }
            ],
            "createdAt": "2024-03-26T06:01:31.162Z",
            "updatedAt": "2024-03-26T06:01:31.162Z",
            "__v": 0,
            "id": "660264bbcc0b965b6a88c25f"
        },
        "examType": "Mid-Semester",
        "date": "2024-04-02T00:00:00.000Z",
        "duration": 120,
        "faculty": {
            "_id": "65f928b0c76172e4b0ebe30d",
            "firstName": "Naineel",
            "lastName": "Soyantar",
            "department": "65f83397a59c175085c9103b",
            "designation": "PROFESSOR",
            "address": "123, Main St. City, Country",
            "phoneNumber": 9023031861,
            "email": "naineelsoyantar@gmail.com",
            "qualification": [
                "Bachelor's in Computer Engineering"
            ],
            "experience": 0,
            "dob": "2002-09-12T00:00:00.000Z",
            "doj": "2023-02-10T00:00:00.000Z",
            "salary": 1000000000000,
            "semesters": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8
            ],
            "subjects": [
                "65f91b5f1d8f9bc189e87142"
            ],
            "profilePicture": "",
            "isHOD": true,
            "createdAt": "2024-03-19T05:54:56.824Z",
            "updatedAt": "2024-03-25T05:01:07.822Z",
            "__v": 0,
            "fullName": "Naineel Soyantar",
            "id": "65f928b0c76172e4b0ebe30d"
        },
        "createdAt": "2024-03-26T06:29:10.287Z",
        "updatedAt": "2024-03-26T06:29:10.287Z",
        "__v": 0,
        "isCompleted": false,
        "id": "66026b3631576e8f74c33663"
    },
    {
        "_id": "66026b3631576e8f74c33666",
        "name": "Mid Semester 1",
        "description": "This is the mid semster exam for semester 1",
        "totalMarks": 30,
        "subject": {
            "_id": "6602649ecc0b965b6a88c250",
            "name": "Introduction to Computer Fundamentals",
            "subjectCode": 310701,
            "department": "65f83397a59c175085c9103b",
            "semester": 1,
            "description": "Introduction to computer science fundamentals",
            "credits": 3,
            "hoursPerWeek": 4,
            "resources": [
                {
                    "name": "Course Textbook",
                    "link": "http://example.com/textbook",
                    "description": "Required reading material for the course",
                    "_id": "6602649ecc0b965b6a88c251",
                    "createdAt": "2024-03-26T06:01:02.892Z",
                    "updatedAt": "2024-03-26T06:01:02.892Z",
                    "id": "6602649ecc0b965b6a88c251"
                },
                {
                    "name": "Online Lectures",
                    "link": "http://example.com/lectures",
                    "description": "Recorded lectures covering course topics",
                    "_id": "6602649ecc0b965b6a88c252",
                    "createdAt": "2024-03-26T06:01:02.892Z",
                    "updatedAt": "2024-03-26T06:01:02.892Z",
                    "id": "6602649ecc0b965b6a88c252"
                }
            ],
            "createdAt": "2024-03-26T06:01:02.892Z",
            "updatedAt": "2024-03-26T06:01:02.892Z",
            "__v": 0,
            "id": "6602649ecc0b965b6a88c250"
        },
        "examType": "Mid-Semester",
        "date": "2024-04-03T00:00:00.000Z",
        "duration": 120,
        "faculty": {
            "_id": "65f928b0c76172e4b0ebe30d",
            "firstName": "Naineel",
            "lastName": "Soyantar",
            "department": "65f83397a59c175085c9103b",
            "designation": "PROFESSOR",
            "address": "123, Main St. City, Country",
            "phoneNumber": 9023031861,
            "email": "naineelsoyantar@gmail.com",
            "qualification": [
                "Bachelor's in Computer Engineering"
            ],
            "experience": 0,
            "dob": "2002-09-12T00:00:00.000Z",
            "doj": "2023-02-10T00:00:00.000Z",
            "salary": 1000000000000,
            "semesters": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8
            ],
            "subjects": [
                "65f91b5f1d8f9bc189e87142"
            ],
            "profilePicture": "",
            "isHOD": true,
            "createdAt": "2024-03-19T05:54:56.824Z",
            "updatedAt": "2024-03-25T05:01:07.822Z",
            "__v": 0,
            "fullName": "Naineel Soyantar",
            "id": "65f928b0c76172e4b0ebe30d"
        },
        "createdAt": "2024-03-26T06:29:10.317Z",
        "updatedAt": "2024-03-26T06:29:10.317Z",
        "__v": 0,
        "isCompleted": false,
        "id": "66026b3631576e8f74c33666"
    },
    {
        "_id": "66026b3631576e8f74c33669",
        "name": "Mid Semester 1",
        "description": "This is the mid semster exam for semester 1",
        "totalMarks": 30,
        "subject": {
            "_id": "66026486cc0b965b6a88c24b",
            "name": "Digital Fundamentals",
            "subjectCode": 310702,
            "department": "65f83397a59c175085c9103b",
            "semester": 1,
            "description": "Introduction to computer science fundamentals",
            "credits": 3,
            "hoursPerWeek": 4,
            "resources": [
                {
                    "name": "Course Textbook",
                    "link": "http://example.com/textbook",
                    "description": "Required reading material for the course",
                    "_id": "66026486cc0b965b6a88c24c",
                    "createdAt": "2024-03-26T06:00:38.483Z",
                    "updatedAt": "2024-03-26T06:00:38.483Z",
                    "id": "66026486cc0b965b6a88c24c"
                },
                {
                    "name": "Online Lectures",
                    "link": "http://example.com/lectures",
                    "description": "Recorded lectures covering course topics",
                    "_id": "66026486cc0b965b6a88c24d",
                    "createdAt": "2024-03-26T06:00:38.483Z",
                    "updatedAt": "2024-03-26T06:00:38.483Z",
                    "id": "66026486cc0b965b6a88c24d"
                }
            ],
            "createdAt": "2024-03-26T06:00:38.484Z",
            "updatedAt": "2024-03-26T06:00:38.484Z",
            "__v": 0,
            "id": "66026486cc0b965b6a88c24b"
        },
        "examType": "Mid-Semester",
        "date": "2024-04-04T00:00:00.000Z",
        "duration": 120,
        "faculty": {
            "_id": "65f928b0c76172e4b0ebe30d",
            "firstName": "Naineel",
            "lastName": "Soyantar",
            "department": "65f83397a59c175085c9103b",
            "designation": "PROFESSOR",
            "address": "123, Main St. City, Country",
            "phoneNumber": 9023031861,
            "email": "naineelsoyantar@gmail.com",
            "qualification": [
                "Bachelor's in Computer Engineering"
            ],
            "experience": 0,
            "dob": "2002-09-12T00:00:00.000Z",
            "doj": "2023-02-10T00:00:00.000Z",
            "salary": 1000000000000,
            "semesters": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8
            ],
            "subjects": [
                "65f91b5f1d8f9bc189e87142"
            ],
            "profilePicture": "",
            "isHOD": true,
            "createdAt": "2024-03-19T05:54:56.824Z",
            "updatedAt": "2024-03-25T05:01:07.822Z",
            "__v": 0,
            "fullName": "Naineel Soyantar",
            "id": "65f928b0c76172e4b0ebe30d"
        },
        "createdAt": "2024-03-26T06:29:10.350Z",
        "updatedAt": "2024-03-26T06:29:10.350Z",
        "__v": 0,
        "isCompleted": false,
        "id": "66026b3631576e8f74c33669"
    },
    {
        "_id": "66026bd60707737304e919a2",
        "name": "Mid Semester 2",
        "description": "This is the mid semster exam for semester 1",
        "totalMarks": 30,
        "subject": {
            "_id": "660264c7cc0b965b6a88c264",
            "name": "Data Structures",
            "subjectCode": 310704,
            "department": "65f83397a59c175085c9103b",
            "semester": 1,
            "description": "Introduction to computer science fundamentals",
            "credits": 3,
            "hoursPerWeek": 4,
            "resources": [
                {
                    "name": "Course Textbook",
                    "link": "http://example.com/textbook",
                    "description": "Required reading material for the course",
                    "_id": "660264c7cc0b965b6a88c265",
                    "createdAt": "2024-03-26T06:01:43.295Z",
                    "updatedAt": "2024-03-26T06:01:43.295Z",
                    "id": "660264c7cc0b965b6a88c265"
                },
                {
                    "name": "Online Lectures",
                    "link": "http://example.com/lectures",
                    "description": "Recorded lectures covering course topics",
                    "_id": "660264c7cc0b965b6a88c266",
                    "createdAt": "2024-03-26T06:01:43.295Z",
                    "updatedAt": "2024-03-26T06:01:43.295Z",
                    "id": "660264c7cc0b965b6a88c266"
                }
            ],
            "createdAt": "2024-03-26T06:01:43.295Z",
            "updatedAt": "2024-03-26T06:01:43.295Z",
            "__v": 0,
            "id": "660264c7cc0b965b6a88c264"
        },
        "examType": "Mid-Semester",
        "date": "2024-04-05T00:00:00.000Z",
        "duration": 120,
        "faculty": {
            "_id": "65f928b0c76172e4b0ebe30d",
            "firstName": "Naineel",
            "lastName": "Soyantar",
            "department": "65f83397a59c175085c9103b",
            "designation": "PROFESSOR",
            "address": "123, Main St. City, Country",
            "phoneNumber": 9023031861,
            "email": "naineelsoyantar@gmail.com",
            "qualification": [
                "Bachelor's in Computer Engineering"
            ],
            "experience": 0,
            "dob": "2002-09-12T00:00:00.000Z",
            "doj": "2023-02-10T00:00:00.000Z",
            "salary": 1000000000000,
            "semesters": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8
            ],
            "subjects": [
                "65f91b5f1d8f9bc189e87142"
            ],
            "profilePicture": "",
            "isHOD": true,
            "createdAt": "2024-03-19T05:54:56.824Z",
            "updatedAt": "2024-03-25T05:01:07.822Z",
            "__v": 0,
            "fullName": "Naineel Soyantar",
            "id": "65f928b0c76172e4b0ebe30d"
        },
        "createdAt": "2024-03-26T06:31:50.429Z",
        "updatedAt": "2024-03-26T06:31:50.429Z",
        "__v": 0,
        "isCompleted": false,
        "id": "66026bd60707737304e919a2"
    },
    {
        "_id": "66026bd60707737304e919a6",
        "name": "Mid Semester 2",
        "description": "This is the mid semster exam for semester 1",
        "totalMarks": 30,
        "subject": {
            "_id": "660264bbcc0b965b6a88c25f",
            "name": "Database Management Systems",
            "subjectCode": 310703,
            "department": "65f83397a59c175085c9103b",
            "semester": 1,
            "description": "Introduction to computer science fundamentals",
            "credits": 3,
            "hoursPerWeek": 4,
            "resources": [
                {
                    "name": "Course Textbook",
                    "link": "http://example.com/textbook",
                    "description": "Required reading material for the course",
                    "_id": "660264bbcc0b965b6a88c260",
                    "createdAt": "2024-03-26T06:01:31.162Z",
                    "updatedAt": "2024-03-26T06:01:31.162Z",
                    "id": "660264bbcc0b965b6a88c260"
                },
                {
                    "name": "Online Lectures",
                    "link": "http://example.com/lectures",
                    "description": "Recorded lectures covering course topics",
                    "_id": "660264bbcc0b965b6a88c261",
                    "createdAt": "2024-03-26T06:01:31.162Z",
                    "updatedAt": "2024-03-26T06:01:31.162Z",
                    "id": "660264bbcc0b965b6a88c261"
                }
            ],
            "createdAt": "2024-03-26T06:01:31.162Z",
            "updatedAt": "2024-03-26T06:01:31.162Z",
            "__v": 0,
            "id": "660264bbcc0b965b6a88c25f"
        },
        "examType": "Mid-Semester",
        "date": "2024-04-08T00:00:00.000Z",
        "duration": 120,
        "faculty": {
            "_id": "65f928b0c76172e4b0ebe30d",
            "firstName": "Naineel",
            "lastName": "Soyantar",
            "department": "65f83397a59c175085c9103b",
            "designation": "PROFESSOR",
            "address": "123, Main St. City, Country",
            "phoneNumber": 9023031861,
            "email": "naineelsoyantar@gmail.com",
            "qualification": [
                "Bachelor's in Computer Engineering"
            ],
            "experience": 0,
            "dob": "2002-09-12T00:00:00.000Z",
            "doj": "2023-02-10T00:00:00.000Z",
            "salary": 1000000000000,
            "semesters": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8
            ],
            "subjects": [
                "65f91b5f1d8f9bc189e87142"
            ],
            "profilePicture": "",
            "isHOD": true,
            "createdAt": "2024-03-19T05:54:56.824Z",
            "updatedAt": "2024-03-25T05:01:07.822Z",
            "__v": 0,
            "fullName": "Naineel Soyantar",
            "id": "65f928b0c76172e4b0ebe30d"
        },
        "createdAt": "2024-03-26T06:31:50.476Z",
        "updatedAt": "2024-03-26T06:31:50.476Z",
        "__v": 0,
        "isCompleted": false,
        "id": "66026bd60707737304e919a6"
    },
    {
        "_id": "66026bd60707737304e919aa",
        "name": "Mid Semester 2",
        "description": "This is the mid semster exam for semester 1",
        "totalMarks": 30,
        "subject": {
            "_id": "6602649ecc0b965b6a88c250",
            "name": "Introduction to Computer Fundamentals",
            "subjectCode": 310701,
            "department": "65f83397a59c175085c9103b",
            "semester": 1,
            "description": "Introduction to computer science fundamentals",
            "credits": 3,
            "hoursPerWeek": 4,
            "resources": [
                {
                    "name": "Course Textbook",
                    "link": "http://example.com/textbook",
                    "description": "Required reading material for the course",
                    "_id": "6602649ecc0b965b6a88c251",
                    "createdAt": "2024-03-26T06:01:02.892Z",
                    "updatedAt": "2024-03-26T06:01:02.892Z",
                    "id": "6602649ecc0b965b6a88c251"
                },
                {
                    "name": "Online Lectures",
                    "link": "http://example.com/lectures",
                    "description": "Recorded lectures covering course topics",
                    "_id": "6602649ecc0b965b6a88c252",
                    "createdAt": "2024-03-26T06:01:02.892Z",
                    "updatedAt": "2024-03-26T06:01:02.892Z",
                    "id": "6602649ecc0b965b6a88c252"
                }
            ],
            "createdAt": "2024-03-26T06:01:02.892Z",
            "updatedAt": "2024-03-26T06:01:02.892Z",
            "__v": 0,
            "id": "6602649ecc0b965b6a88c250"
        },
        "examType": "Mid-Semester",
        "date": "2024-04-09T00:00:00.000Z",
        "duration": 120,
        "faculty": {
            "_id": "65f928b0c76172e4b0ebe30d",
            "firstName": "Naineel",
            "lastName": "Soyantar",
            "department": "65f83397a59c175085c9103b",
            "designation": "PROFESSOR",
            "address": "123, Main St. City, Country",
            "phoneNumber": 9023031861,
            "email": "naineelsoyantar@gmail.com",
            "qualification": [
                "Bachelor's in Computer Engineering"
            ],
            "experience": 0,
            "dob": "2002-09-12T00:00:00.000Z",
            "doj": "2023-02-10T00:00:00.000Z",
            "salary": 1000000000000,
            "semesters": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8
            ],
            "subjects": [
                "65f91b5f1d8f9bc189e87142"
            ],
            "profilePicture": "",
            "isHOD": true,
            "createdAt": "2024-03-19T05:54:56.824Z",
            "updatedAt": "2024-03-25T05:01:07.822Z",
            "__v": 0,
            "fullName": "Naineel Soyantar",
            "id": "65f928b0c76172e4b0ebe30d"
        },
        "createdAt": "2024-03-26T06:31:50.514Z",
        "updatedAt": "2024-03-26T06:31:50.514Z",
        "__v": 0,
        "isCompleted": false,
        "id": "66026bd60707737304e919aa"
    },
    {
        "_id": "66026bd60707737304e919ae",
        "name": "Mid Semester 2",
        "description": "This is the mid semster exam for semester 1",
        "totalMarks": 30,
        "subject": {
            "_id": "66026486cc0b965b6a88c24b",
            "name": "Digital Fundamentals",
            "subjectCode": 310702,
            "department": "65f83397a59c175085c9103b",
            "semester": 1,
            "description": "Introduction to computer science fundamentals",
            "credits": 3,
            "hoursPerWeek": 4,
            "resources": [
                {
                    "name": "Course Textbook",
                    "link": "http://example.com/textbook",
                    "description": "Required reading material for the course",
                    "_id": "66026486cc0b965b6a88c24c",
                    "createdAt": "2024-03-26T06:00:38.483Z",
                    "updatedAt": "2024-03-26T06:00:38.483Z",
                    "id": "66026486cc0b965b6a88c24c"
                },
                {
                    "name": "Online Lectures",
                    "link": "http://example.com/lectures",
                    "description": "Recorded lectures covering course topics",
                    "_id": "66026486cc0b965b6a88c24d",
                    "createdAt": "2024-03-26T06:00:38.483Z",
                    "updatedAt": "2024-03-26T06:00:38.483Z",
                    "id": "66026486cc0b965b6a88c24d"
                }
            ],
            "createdAt": "2024-03-26T06:00:38.484Z",
            "updatedAt": "2024-03-26T06:00:38.484Z",
            "__v": 0,
            "id": "66026486cc0b965b6a88c24b"
        },
        "examType": "Mid-Semester",
        "date": "2024-04-10T00:00:00.000Z",
        "duration": 120,
        "faculty": {
            "_id": "65f928b0c76172e4b0ebe30d",
            "firstName": "Naineel",
            "lastName": "Soyantar",
            "department": "65f83397a59c175085c9103b",
            "designation": "PROFESSOR",
            "address": "123, Main St. City, Country",
            "phoneNumber": 9023031861,
            "email": "naineelsoyantar@gmail.com",
            "qualification": [
                "Bachelor's in Computer Engineering"
            ],
            "experience": 0,
            "dob": "2002-09-12T00:00:00.000Z",
            "doj": "2023-02-10T00:00:00.000Z",
            "salary": 1000000000000,
            "semesters": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8
            ],
            "subjects": [
                "65f91b5f1d8f9bc189e87142"
            ],
            "profilePicture": "",
            "isHOD": true,
            "createdAt": "2024-03-19T05:54:56.824Z",
            "updatedAt": "2024-03-25T05:01:07.822Z",
            "__v": 0,
            "fullName": "Naineel Soyantar",
            "id": "65f928b0c76172e4b0ebe30d"
        },
        "createdAt": "2024-03-26T06:31:50.565Z",
        "updatedAt": "2024-03-26T06:31:50.565Z",
        "__v": 0,
        "isCompleted": false,
        "id": "66026bd60707737304e919ae"
    },
    {
        "_id": "66026be40707737304e919c5",
        "name": "Mid Semester 2",
        "description": "This is the mid semster exam for semester 1",
        "totalMarks": 30,
        "subject": {
            "_id": "660264c7cc0b965b6a88c264",
            "name": "Data Structures",
            "subjectCode": 310704,
            "department": "65f83397a59c175085c9103b",
            "semester": 1,
            "description": "Introduction to computer science fundamentals",
            "credits": 3,
            "hoursPerWeek": 4,
            "resources": [
                {
                    "name": "Course Textbook",
                    "link": "http://example.com/textbook",
                    "description": "Required reading material for the course",
                    "_id": "660264c7cc0b965b6a88c265",
                    "createdAt": "2024-03-26T06:01:43.295Z",
                    "updatedAt": "2024-03-26T06:01:43.295Z",
                    "id": "660264c7cc0b965b6a88c265"
                },
                {
                    "name": "Online Lectures",
                    "link": "http://example.com/lectures",
                    "description": "Recorded lectures covering course topics",
                    "_id": "660264c7cc0b965b6a88c266",
                    "createdAt": "2024-03-26T06:01:43.295Z",
                    "updatedAt": "2024-03-26T06:01:43.295Z",
                    "id": "660264c7cc0b965b6a88c266"
                }
            ],
            "createdAt": "2024-03-26T06:01:43.295Z",
            "updatedAt": "2024-03-26T06:01:43.295Z",
            "__v": 0,
            "id": "660264c7cc0b965b6a88c264"
        },
        "examType": "Mid-Semester",
        "date": "2024-04-11T00:00:00.000Z",
        "duration": 120,
        "faculty": {
            "_id": "65f928b0c76172e4b0ebe30d",
            "firstName": "Naineel",
            "lastName": "Soyantar",
            "department": "65f83397a59c175085c9103b",
            "designation": "PROFESSOR",
            "address": "123, Main St. City, Country",
            "phoneNumber": 9023031861,
            "email": "naineelsoyantar@gmail.com",
            "qualification": [
                "Bachelor's in Computer Engineering"
            ],
            "experience": 0,
            "dob": "2002-09-12T00:00:00.000Z",
            "doj": "2023-02-10T00:00:00.000Z",
            "salary": 1000000000000,
            "semesters": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8
            ],
            "subjects": [
                "65f91b5f1d8f9bc189e87142"
            ],
            "profilePicture": "",
            "isHOD": true,
            "createdAt": "2024-03-19T05:54:56.824Z",
            "updatedAt": "2024-03-25T05:01:07.822Z",
            "__v": 0,
            "fullName": "Naineel Soyantar",
            "id": "65f928b0c76172e4b0ebe30d"
        },
        "createdAt": "2024-03-26T06:32:04.816Z",
        "updatedAt": "2024-03-26T06:32:04.816Z",
        "__v": 0,
        "isCompleted": false,
        "id": "66026be40707737304e919c5"
    },
    {
        "_id": "66026be40707737304e919c9",
        "name": "Mid Semester 2",
        "description": "This is the mid semster exam for semester 1",
        "totalMarks": 30,
        "subject": {
            "_id": "660264bbcc0b965b6a88c25f",
            "name": "Database Management Systems",
            "subjectCode": 310703,
            "department": "65f83397a59c175085c9103b",
            "semester": 1,
            "description": "Introduction to computer science fundamentals",
            "credits": 3,
            "hoursPerWeek": 4,
            "resources": [
                {
                    "name": "Course Textbook",
                    "link": "http://example.com/textbook",
                    "description": "Required reading material for the course",
                    "_id": "660264bbcc0b965b6a88c260",
                    "createdAt": "2024-03-26T06:01:31.162Z",
                    "updatedAt": "2024-03-26T06:01:31.162Z",
                    "id": "660264bbcc0b965b6a88c260"
                },
                {
                    "name": "Online Lectures",
                    "link": "http://example.com/lectures",
                    "description": "Recorded lectures covering course topics",
                    "_id": "660264bbcc0b965b6a88c261",
                    "createdAt": "2024-03-26T06:01:31.162Z",
                    "updatedAt": "2024-03-26T06:01:31.162Z",
                    "id": "660264bbcc0b965b6a88c261"
                }
            ],
            "createdAt": "2024-03-26T06:01:31.162Z",
            "updatedAt": "2024-03-26T06:01:31.162Z",
            "__v": 0,
            "id": "660264bbcc0b965b6a88c25f"
        },
        "examType": "Mid-Semester",
        "date": "2024-04-12T00:00:00.000Z",
        "duration": 120,
        "faculty": {
            "_id": "65f928b0c76172e4b0ebe30d",
            "firstName": "Naineel",
            "lastName": "Soyantar",
            "department": "65f83397a59c175085c9103b",
            "designation": "PROFESSOR",
            "address": "123, Main St. City, Country",
            "phoneNumber": 9023031861,
            "email": "naineelsoyantar@gmail.com",
            "qualification": [
                "Bachelor's in Computer Engineering"
            ],
            "experience": 0,
            "dob": "2002-09-12T00:00:00.000Z",
            "doj": "2023-02-10T00:00:00.000Z",
            "salary": 1000000000000,
            "semesters": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8
            ],
            "subjects": [
                "65f91b5f1d8f9bc189e87142"
            ],
            "profilePicture": "",
            "isHOD": true,
            "createdAt": "2024-03-19T05:54:56.824Z",
            "updatedAt": "2024-03-25T05:01:07.822Z",
            "__v": 0,
            "fullName": "Naineel Soyantar",
            "id": "65f928b0c76172e4b0ebe30d"
        },
        "createdAt": "2024-03-26T06:32:04.858Z",
        "updatedAt": "2024-03-26T06:32:04.858Z",
        "__v": 0,
        "isCompleted": false,
        "id": "66026be40707737304e919c9"
    },
    {
        "_id": "66026be40707737304e919cd",
        "name": "Mid Semester 2",
        "description": "This is the mid semster exam for semester 1",
        "totalMarks": 30,
        "subject": {
            "_id": "6602649ecc0b965b6a88c250",
            "name": "Introduction to Computer Fundamentals",
            "subjectCode": 310701,
            "department": "65f83397a59c175085c9103b",
            "semester": 1,
            "description": "Introduction to computer science fundamentals",
            "credits": 3,
            "hoursPerWeek": 4,
            "resources": [
                {
                    "name": "Course Textbook",
                    "link": "http://example.com/textbook",
                    "description": "Required reading material for the course",
                    "_id": "6602649ecc0b965b6a88c251",
                    "createdAt": "2024-03-26T06:01:02.892Z",
                    "updatedAt": "2024-03-26T06:01:02.892Z",
                    "id": "6602649ecc0b965b6a88c251"
                },
                {
                    "name": "Online Lectures",
                    "link": "http://example.com/lectures",
                    "description": "Recorded lectures covering course topics",
                    "_id": "6602649ecc0b965b6a88c252",
                    "createdAt": "2024-03-26T06:01:02.892Z",
                    "updatedAt": "2024-03-26T06:01:02.892Z",
                    "id": "6602649ecc0b965b6a88c252"
                }
            ],
            "createdAt": "2024-03-26T06:01:02.892Z",
            "updatedAt": "2024-03-26T06:01:02.892Z",
            "__v": 0,
            "id": "6602649ecc0b965b6a88c250"
        },
        "examType": "Mid-Semester",
        "date": "2024-04-15T00:00:00.000Z",
        "duration": 120,
        "faculty": {
            "_id": "65f928b0c76172e4b0ebe30d",
            "firstName": "Naineel",
            "lastName": "Soyantar",
            "department": "65f83397a59c175085c9103b",
            "designation": "PROFESSOR",
            "address": "123, Main St. City, Country",
            "phoneNumber": 9023031861,
            "email": "naineelsoyantar@gmail.com",
            "qualification": [
                "Bachelor's in Computer Engineering"
            ],
            "experience": 0,
            "dob": "2002-09-12T00:00:00.000Z",
            "doj": "2023-02-10T00:00:00.000Z",
            "salary": 1000000000000,
            "semesters": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8
            ],
            "subjects": [
                "65f91b5f1d8f9bc189e87142"
            ],
            "profilePicture": "",
            "isHOD": true,
            "createdAt": "2024-03-19T05:54:56.824Z",
            "updatedAt": "2024-03-25T05:01:07.822Z",
            "__v": 0,
            "fullName": "Naineel Soyantar",
            "id": "65f928b0c76172e4b0ebe30d"
        },
        "createdAt": "2024-03-26T06:32:04.897Z",
        "updatedAt": "2024-03-26T06:32:04.897Z",
        "__v": 0,
        "isCompleted": false,
        "id": "66026be40707737304e919cd"
    },
    {
        "_id": "66026be40707737304e919d1",
        "name": "Mid Semester 2",
        "description": "This is the mid semster exam for semester 1",
        "totalMarks": 30,
        "subject": {
            "_id": "66026486cc0b965b6a88c24b",
            "name": "Digital Fundamentals",
            "subjectCode": 310702,
            "department": "65f83397a59c175085c9103b",
            "semester": 1,
            "description": "Introduction to computer science fundamentals",
            "credits": 3,
            "hoursPerWeek": 4,
            "resources": [
                {
                    "name": "Course Textbook",
                    "link": "http://example.com/textbook",
                    "description": "Required reading material for the course",
                    "_id": "66026486cc0b965b6a88c24c",
                    "createdAt": "2024-03-26T06:00:38.483Z",
                    "updatedAt": "2024-03-26T06:00:38.483Z",
                    "id": "66026486cc0b965b6a88c24c"
                },
                {
                    "name": "Online Lectures",
                    "link": "http://example.com/lectures",
                    "description": "Recorded lectures covering course topics",
                    "_id": "66026486cc0b965b6a88c24d",
                    "createdAt": "2024-03-26T06:00:38.483Z",
                    "updatedAt": "2024-03-26T06:00:38.483Z",
                    "id": "66026486cc0b965b6a88c24d"
                }
            ],
            "createdAt": "2024-03-26T06:00:38.484Z",
            "updatedAt": "2024-03-26T06:00:38.484Z",
            "__v": 0,
            "id": "66026486cc0b965b6a88c24b"
        },
        "examType": "Mid-Semester",
        "date": "2024-04-16T00:00:00.000Z",
        "duration": 120,
        "faculty": {
            "_id": "65f928b0c76172e4b0ebe30d",
            "firstName": "Naineel",
            "lastName": "Soyantar",
            "department": "65f83397a59c175085c9103b",
            "designation": "PROFESSOR",
            "address": "123, Main St. City, Country",
            "phoneNumber": 9023031861,
            "email": "naineelsoyantar@gmail.com",
            "qualification": [
                "Bachelor's in Computer Engineering"
            ],
            "experience": 0,
            "dob": "2002-09-12T00:00:00.000Z",
            "doj": "2023-02-10T00:00:00.000Z",
            "salary": 1000000000000,
            "semesters": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8
            ],
            "subjects": [
                "65f91b5f1d8f9bc189e87142"
            ],
            "profilePicture": "",
            "isHOD": true,
            "createdAt": "2024-03-19T05:54:56.824Z",
            "updatedAt": "2024-03-25T05:01:07.822Z",
            "__v": 0,
            "fullName": "Naineel Soyantar",
            "id": "65f928b0c76172e4b0ebe30d"
        },
        "createdAt": "2024-03-26T06:32:04.942Z",
        "updatedAt": "2024-03-26T06:32:04.942Z",
        "__v": 0,
        "isCompleted": false,
        "id": "66026be40707737304e919d1"
    }
]