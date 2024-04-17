import { useEffect, useState } from "react";
import "./Events.scss";
import ServiceTitle from "./ServiceTitle";
import YearMonthFilter from "./YearMonthFilter";
import EventCard from "./events/EventCard";
import { fetchEvents } from "../services/services";

export default function Events() {
  const [events, setEvents] = useState({
    list: [],
    isLoading: true,
  });
  const { list: eventsList, isLoading: isEventsLoading } = events;
  const getEvents = async () => {
    const res = await fetchEvents();
    console.log(res);
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
        <YearMonthFilter />
        <div className="eventsContainer">
          {isEventsLoading ? (
            <h1>Loading...</h1>
          ) : (
            eventsList.map((event) => (
              <EventCard key={event._id} eventDetails={event} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
