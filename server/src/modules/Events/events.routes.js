import { Router } from "express";
import { validate } from "express-validation";
import { checkPermissions, isAuthenticated } from "../../middlewares/middlewares.js";
import Admin from "../Admin/Admin.js";
import { createEvent, deleteEvent, getEvents, updateEvent } from "./events.controller.js";
import { createEventSchema, deleteEventSchema, getEventsSchema, updateEventSchema } from "./events.schema.js";

const router = Router({ mergeParams: true });

//!Path - /api/events

router
    .get("/", isAuthenticated, validate(getEventsSchema), getEvents)
    .post("/", isAuthenticated, checkPermissions(Admin), validate(createEventSchema, { context: true }), createEvent)
    .patch("/:eventId", isAuthenticated, checkPermissions(Admin), validate(updateEventSchema), updateEvent)
    .delete("/:eventId", isAuthenticated, checkPermissions(Admin), validate(deleteEventSchema), deleteEvent);

export default router;