import ServiceTitle from "./ServiceTitle";
import ExamCard from "./exam/ExamCard";
import "./Exam.scss";
import ServiceSubTitle from "./ServiceSubTitle";
import { useCallback, useContext, useEffect, useState } from "react";
import { fetchExams } from "../services/services";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

import Loader from "react-js-loader";

export default function Exam() {
	const { userType } = useContext(AuthContext);
	const [exam, setExam] = useState([
		{
			title: "exams",
			label: "Exams",
			list: [],
			isLoading: true,
		},
		{
			title: "completedExams",
			label: "Completed Exams",
			list: [],
			isLoading: true,
		},
	]);

	const getExams = useCallback(async () => {
		try {
			const url = userType === "student" ? "/student/exams/" : "/exam/get-own";
			const res = await fetchExams({ url });
			if (res) {
				const { exams, completedExams } = res;
				const examData = [
					{
						title: "exams",
						label: "Exams",
						list: exams,
						isLoading: false,
					},
					completedExams && {
						title: "completedExams",
						label: "Completed Exams",
						list: completedExams,
						isLoading: false,
					},
				].filter(Boolean);
				setExam(examData);
			}
		} catch (error) {
			toast.error("Something went wrong while fetching exams");
		}
	}, [userType]);

	useEffect(() => {
		getExams();
	}, [getExams]);

	console.log("first", exam);

	return (
		<div className="examsService">
			<ServiceTitle serviceTitle="Exam" />
			{exam.map((examCategory) => (
				<div key={examCategory.title} className="examsWrapper">
					<ServiceSubTitle serviceSubTitle={examCategory.label} />
					{examCategory.isLoading ? (
						<div className="loaderWrapper" style={{ display: "flex" }}>
							<Loader type="spinner-default" bgColor="#0000FF" size="60" />
						</div>
					) : (
						<div className="examsContainer">
							{examCategory.list.length > 0 ? (
								examCategory.list.map((examDetails) => (
									<ExamCard examDetails={examDetails} key={examDetails.id} />
								))
							) : (
								<h4>No exams to show</h4>
							)}
						</div>
					)}
				</div>
			))}
		</div>
	);
}
