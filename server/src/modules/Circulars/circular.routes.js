import { Router } from "express";
import { validate } from "express-validation";
import {
  checkPermissions,
  isAuthenticated,
} from "../../middlewares/middlewares.js";
import Admin from "../Admin/Admin.js";
import {
  createCircularSchema,
  deleteCircularSchema,
  getCircularsSchema,
  updateCircularSchema,
} from "./circular.schema.js";
import {
  createCircular,
  deleteCircular,
  getCirculars,
  updateCircular,
} from "./circular.controller.js";

const router = Router({ mergeParams: true });

//!Path - /api/circular

router
  .get("/", isAuthenticated, validate(getCircularsSchema), getCirculars)
  .post(
    "/",
    isAuthenticated,
    checkPermissions(Admin),
    validate(createCircularSchema, { context: true }),
    createCircular
  )
  .patch(
    "/:circularId",
    isAuthenticated,
    checkPermissions(Admin),
    validate(updateCircularSchema),
    updateCircular
  )
  .delete(
    "/:circularId",
    isAuthenticated,
    checkPermissions(Admin),
    validate(deleteCircularSchema),
    deleteCircular
  );

export default router;
