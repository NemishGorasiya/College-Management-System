import { useContext, useEffect, useState } from "react";
import "./Events.scss";
import ServiceTitle from "./ServiceTitle";
import YearMonthFilter from "./YearMonthFilter";
import EventCard from "./events/EventCard";
import { fetchEvents } from "../services/services";
import UploadCircularButton from "./UploadCircularButton";
import AddNewEventButton from "./events/AddNewEventButton";
import { AuthContext } from "../context/AuthContext";

import Loader from "react-js-loader";

export default function Events() {
	const { userType } = useContext(AuthContext);
	const [events, setEvents] = useState({
		list: [],
		isLoading: true,
	});
	const { list: eventsList, isLoading: isEventsLoading } = events;
	const getEvents = async () => {
		const res = await fetchEvents();
		setEvents({
			list: res.events,
			isLoading: false,
		});
	};
	useEffect(() => {
		getEvents();
	}, []);
	return (
		<div className="eventsService">
			<ServiceTitle serviceTitle="Events" />
			<div className="eventsWrapper">
				{userType === "admin" && <AddNewEventButton getEvents={getEvents} />}

				<YearMonthFilter />
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
