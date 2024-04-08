import { addMonths, format, getMonth, getYear, isBefore } from "date-fns";
import httpStatus from "http-status";
import CustomError from "../../errors/CustomError.js";
import Event from "./Event.js";

export const getEvents = async (req, res) => {
    //query params - based on months and year
    let { date } = req.query;
    const filterObj = {};

    if (!date) {
        date = format(new Date.now(), 'yyyy-mm-dd')
    }

    //fetches latest dated events only

    const startDate = new Date(`${getYear(date)}-${getMonth(date)}-01`);
    const endDate = addMonths(startDate, 1);

    filterObj.startDate = {
        $gte: startDate,
        $lt: endDate,
    }

    const events = await Event.find(filterObj);

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

    await Event.deleteOne({ id: event.id });

    return res.status(httpStatus.OK).send({
        "message": "Event deleted successfully",
    })
};