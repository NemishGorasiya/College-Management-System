import "./Circulars.scss";
import ServiceTitle from "./ServiceTitle";
import {
	deleteCircular,
	downloadCircular,
	fetchCirculars,
} from "../services/services";
import { useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import UploadCircularButton from "./UploadCircularButton";
import { formatDate } from "../utils/utilityFunctions";
import { AuthContext } from "../context/AuthContext";
import { FormControl, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import Loader from "react-js-loader";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function Circulars() {
	const { userType } = useContext(AuthContext);
	const [circulars, setCirculars] = useState({
		list: [],
		isLoading: true,
	});
	const [filteredDate, setFilteredDate] = useState("");
	const { list: circularList, isLoading: isCircularsLoading } = circulars || {};

	const getCirculars = useCallback(async () => {
		const queryParams = {
			date: filteredDate,
		};
		const response = await fetchCirculars({ queryParams });
		setCirculars({
			list: response.circulars,
			isLoading: false,
		});
	}, [filteredDate]);

	const handleDownload = async ({ url, fileName }) => {
		const response = await downloadCircular({ url, fileName });
		if (response) {
			toast.success("Circular downloaded successfully");
		}
	};

	const handleDeleteCircular = async (circularId) => {
		try {
			const response = await deleteCircular(circularId);
			if (response) {
				toast.success("Circular deleted successfully");
				getCirculars();
			}
		} catch (error) {
			toast.error("Something went wrong while deleting circular");
		}
	};

	useEffect(() => {
		getCirculars();
	}, [getCirculars]);

	return (
		<div className="circularsService">
			<ServiceTitle serviceTitle="Important Circulars" />
			{isCircularsLoading ? (
				<div className="loaderWrapper" style={{ display: "flex" }}>
					<Loader type="spinner-default" bgColor="#0000FF" size="60" />
				</div>
			) : (
				<div className="circularsWrapper">
					{userType === "admin" && (
						<UploadCircularButton getCirculars={getCirculars} />
					)}
					<FormControl
						variant="outlined"
						style={{ display: "block", width: "250px" }}
						className="formControl"
					>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								id="filter"
								name="filter"
								format="MMM-YYYY"
								label="Filter"
								onChange={(e) => setFilteredDate(`${e.$y}-${e.$M + 1}-${e.$D}`)}
								views={["year", "month"]}
							/>
						</LocalizationProvider>
					</FormControl>
					<div className="circularsContainer">
						{circularList.map((circular) => (
							<div key={circular.id} className="circular">
								<p
									className="circularLink"
									onClick={() => {
										handleDownload({
											url: circular.link,
											fileName: circular.title,
										});
									}}
								>
									{circular.title}
								</p>
								<p className="circularDate">{formatDate(circular.createdAt)}</p>
								{userType === "admin" && (
									<IconButton
										className="deleteButton"
										onClick={() => {
											handleDeleteCircular(circular.id);
										}}
										size="large"
									>
										<DeleteIcon />
									</IconButton>
								)}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
