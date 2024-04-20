import ServiceTitle from "./ServiceTitle";
import "./Result.scss";
import { useContext, useEffect, useState } from "react";
import { downloadResult, fetchResults } from "../services/services.js";
import ResultCard from "./ResultCard.jsx";
import { toast } from "react-hot-toast";
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
			const res = await fetchResults();
			console.log("results", res);
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
			console.log("results", res);
			if (!res) {
				toast.error("Result not found");
			}
		} catch (error) {
			toast.error("Something went wrong while downloading result");
			console.log("ccccc");
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
					<h1>Loading...</h1>
				) : (
					resultList.map((result) => (
						<ResultCard key={result.id} result={result} />
					))
				)}
			</div>
		</div>
	);
}
