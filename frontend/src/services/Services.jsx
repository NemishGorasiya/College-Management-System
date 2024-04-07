import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export const handleStudentLogin = async () => {
	try {
		const res = await axios({
			method: "post",
			url: BASE_URL + "/student/login",
			headers: {
				"Content-Type": "application/json",
			},
			redirect: "follow",
			credentials: "include",
			withCredentials: true,
			data: {
				username: "1234567890",
				password: "password123",
			},
		});
		console.log(res);
	} catch (error) {
		console.error(error);
	}
};
