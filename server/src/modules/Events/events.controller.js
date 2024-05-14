import { addMonths, format, getMonth, getYear, isAfter, isBefore } from "date-fns";
import httpStatus from "http-status";
import CustomError from "../../errors/CustomError.js";
import Event from "./Event.js";
import { TIME_QUANTUM } from "../../constants/constants.js";

export const getEvents = async (req, res) => {
    //query params - based on months and year
    //query params - based on months and year
    let { date } = req.query;
    const filterObj = {};

    let startDate = new Date(TIME_QUANTUM), endDate = addMonths(new Date(), 1);

    if (date) {
        const month = getMonth(date) + 1;
        const year = getYear(date);
        startDate = new Date(`${year}-${month}-01`);
        endDate = addMonths(startDate, 1);
    }


    filterObj.createdAt = {
        $gte: startDate,
        $lt: endDate,
    };

    const eventList = await Event.find(filterObj);


    let events = []
    for (let event of eventList) {
        const obj = {
            _id: event._id,
            name: event.name,
            description: event.description,
            poster: event.poster,
            startDate: event.startDate,
            endDate: event.endDate,
            createdBy: event.createdBy
        }

        events.push(obj)
    }

    return res.status(httpStatus.OK).send({
        "message": "Events fetched successfully",
        events,
    })
};

export const createEvent = async (req, res) => {
    //create event
    const { name, description, poster, startDate, endDate } = req.body;

    const newEvent = new Event({ name, description, poster, startDate, endDate, createdBy: req.user._id });

    await newEvent.save();

    return res.status(httpStatus.CREATED).send({
        "message": "Event created successfully",
    })
};

export const updateEvent = async (req, res) => {
    //get the id of the event
    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
        throw new CustomError(httpStatus.NOT_FOUND, "Event not found");
    };

    for (let item in req.body) {
        if (item === "endDate" && isBefore(req.body[item], event.startDate)) {
            throw new CustomError(httpStatus.BAD_REQUEST, "End Date cannot be before the start date")
        } else if (item === "startDate" && isAfter(req.body[item], event.endDate)) {
            throw new CustomError(httpStatus.BAD_REQUEST, "Start Date cannot be after the end date")
        }

        event[item] = req.body[item];
    }

    await event.save();

    return res.status(httpStatus.OK).send({
        "message": "Event updated successfully",
    });
};

export const deleteEvent = async (req, res) => {
    //get the id of the event 
    const { eventId } = req.params;

    const event = await Event.findById(eventId);


    if (!event) {
        throw new CustomError(httpStatus.NOT_FOUND, "Event not found");
    };

    await Event.deleteOne({ _id: event._id })
    return res.status(httpStatus.OK).send({
        "message": "Event deleted successfully",
    })
};