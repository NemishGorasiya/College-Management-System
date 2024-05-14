import ServiceTitle from "./ServiceTitle";
import "./Result.scss";
import { useContext, useEffect, useState } from "react";
import { downloadResult, fetchResults } from "../services/services.js";
import ResultCard from "./ResultCard.jsx";
import { toast } from "react-hot-toast";

import Loader from "react-js-loader";
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Button,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Result() {
	const [results, setResults] = useState({
		list: [],
		isLoading: true,
	});
	const { userType } = useContext(AuthContext);
	const [exapTypeSelected, setExamTypeSelected] = useState("");
	const { list: resultList, isLoading: isResultsLoading } = results;
	const getResults = async () => {
		try {
			const url = userType === "student" ? "/student/results" : "/result/own";
			const res = await fetchResults({ url });
			const { results } = res;

			setResults({
				list: results,
				isLoading: false,
			});
		} catch (error) {
			console.error(error);
		}
	};
	const handleExamTypeChange = (e) => {
		setExamTypeSelected(e.target.value);
	};

	const handleDownloadResult = async () => {
		if (exapTypeSelected === "" || exapTypeSelected === undefined) {
			return;
		}
		try {
			const res = await downloadResult(exapTypeSelected);
			if (!res) {
				toast.error("Result not found");
			}
		} catch (error) {
			toast.error("Something went wrong while downloading result");
		}
	};

	useEffect(() => {
		getResults();
	}, []);
	return (
		<div className="resultService">
			<ServiceTitle serviceTitle="Result" />
			{userType === "student" && (
				<div className="resultDownloadSelectWrapper">
					<FormControl variant="outlined" className="examTypeSelect">
						<InputLabel htmlFor="examType">Exam</InputLabel>
						<Select label="examType" onChange={handleExamTypeChange}>
							<MenuItem key={1} value="midsem">
								Mid-Semester
							</MenuItem>
							<MenuItem key={2} value="internal">
								Internal Submissions
							</MenuItem>
							<MenuItem key={3} value="viva">
								Viva
							</MenuItem>
						</Select>
					</FormControl>
					<Button
						className="downloadButton"
						variant="contained"
						onClick={handleDownloadResult}
					>
						Download
					</Button>
				</div>
			)}

			<div className="resultWrapper">
				{isResultsLoading ? (
					<div className="loaderWrapper" style={{ display: "flex" }}>
						<Loader type="spinner-default" bgColor="#0000FF" size="60" />
					</div>
				) : (
					resultList.map((result) => (
						<ResultCard key={result.id} result={result} />
					))
				)}
			</div>
		</div>
	);
}
