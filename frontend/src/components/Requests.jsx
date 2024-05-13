import ServiceSubTitle from "./ServiceSubTitle";
import ServiceTitle from "./ServiceTitle";
import "./Requests.scss";
import { useEffect, useState } from "react";
import { fetchRequests } from "../services/services";
import { Button } from "@mui/material";
import { DateToTime, formatDate } from "../utils/utilityFunctions";
import RequestCard from "./RequestCard";

import Loader from "react-js-loader";

const Requests = () => {
	const [requests, setRequests] = useState([
		{
			title: "studentRequests",
			label: "Student Requests",
			list: [],
			isLoading: true,
		},
		{
			title: "facultyRequests",
			label: "Faculty Requests",
			list: [],
			isLoading: true,
		},
		{
			title: "approvedRequests",
			label: "Approved Requests",
			list: [],
			isLoading: true,
		},
		{
			title: "rejectedRequests",
			label: "Rejected Requests",
			list: [],
			isLoading: true,
		},
	]);
	const getRequests = async () => {
		try {
			const res = await fetchRequests();
			setRequests([
				{
					title: "studentRequests",
					label: "Student Requests",
					list: res.studentRequests,
					isLoading: false,
				},
				{
					title: "facultyRequests",
					label: "Faculty Requests",
					list: res.facultyRequests,
					isLoading: false,
				},
				{
					title: "approvedRequests",
					label: "Approved Requests",
					list: res.approvedRequests,
					isLoading: false,
				},
				{
					title: "rejectedRequests",
					label: "Rejected Requests",
					list: res.rejectedRequests,
					isLoading: false,
				},
			]);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getRequests();
	}, []);
	return (
		<div className="requestsPage">
			<ServiceTitle serviceTitle="Incoming Requests" />
			<div className="resultWrapper">
				{requests.map((requestCategory) => (
					<div key={requestCategory.title} className="requestsWrapper">
						<ServiceSubTitle serviceSubTitle={requestCategory.label} />
						{requestCategory.isLoading ? (
							<div className="loaderWrapper" style={{ display: "flex" }}>
								<Loader type="spinner-default" bgColor="#0000FF" size="60" />
							</div>
						) : (
							<div className="requestsContainer">
								{requestCategory.list.length > 0 ? (
									requestCategory.list.map((requestDetails) => (
										<RequestCard
											key={requestDetails._id}
											requestDetails={requestDetails}
											getRequests={getRequests}
										/>
									))
								) : (
									<h4>No Requests Found</h4>
								)}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Requests;
