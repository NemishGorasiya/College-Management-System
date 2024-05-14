import { useCallback, useContext, useEffect, useState } from "react";
import "./Events.scss";
import ServiceTitle from "./ServiceTitle";
import EventCard from "./events/EventCard";
import { fetchEvents } from "../services/services";
import UploadCircularButton from "./UploadCircularButton";
import AddNewEventButton from "./events/AddNewEventButton";
import { AuthContext } from "../context/AuthContext";

import Loader from "react-js-loader";
import { FormControl } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Events() {
	const { userType } = useContext(AuthContext);
	const [events, setEvents] = useState({
		list: [],
		isLoading: true,
	});
	const [filteredDate, setFilteredDate] = useState("");
	const { list: eventsList, isLoading: isEventsLoading } = events;
	const getEvents = useCallback(async () => {
		const queryParams = {
			date: filteredDate,
		};
		const res = await fetchEvents({ queryParams });
		setEvents({
			list: res.events,
			isLoading: false,
		});
	}, [filteredDate]);

	useEffect(() => {
		getEvents();
	}, [getEvents]);
	return (
		<div className="eventsService">
			<ServiceTitle serviceTitle="Events" />
			<div className="eventsWrapper">
				{userType === "admin" && <AddNewEventButton getEvents={getEvents} />}

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
				<div className="eventsContainer">
					{isEventsLoading ? (
						<div className="loaderWrapper" style={{ display: "flex" }}>
							<Loader type="spinner-default" bgColor="#0000FF" size="60" />
						</div>
					) : (
						eventsList.map((event) => (
							<EventCard
								key={event._id}
								eventDetails={event}
								getEvents={getEvents}
								userType={userType}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
}
