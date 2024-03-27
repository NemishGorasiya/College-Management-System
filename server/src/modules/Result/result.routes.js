import { Router } from "express";
import { checkPermissions, isAuthenticated } from "../../middlewares/middlewares.js";
import Admin from "../Admin/Admin.js";
import Faculty from "../Faculty/Faculty.js";
import { createResult, deleteResult, getAllResults, getOwnResults, getResult, updateResult } from "./result.controller.js";
import { validate } from "express-validation";
import { createResultSchema, deleteResultSchema, updateResultSchema } from "./result.schema.js";

const router = Router({ mergeParams: true });

//!PATH - /api/result   

router
    .get("/own", isAuthenticated, checkPermissions(Faculty, Admin), getOwnResults)
    .get("/all", isAuthenticated, checkPermissions(Admin), getAllResults)
    .post("/create", isAuthenticated, checkPermissions(Faculty, Admin), validate(createResultSchema, { keyByField: true }), createResult)
    .get("/:resultId", isAuthenticated, checkPermissions(Faculty, Admin), getResult)
    .patch("/:resultId", isAuthenticated, checkPermissions(Faculty, Admin), validate(updateResultSchema, { keyByField: true }), updateResult)
    .delete("/:resultId", isAuthenticated, checkPermissions(Faculty, Admin), validate(deleteResultSchema, { keyByField: true }), deleteResult);

export default router;