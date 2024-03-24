import { Router } from "express";
import { checkPermissions, isAuthenticated } from "../../middlewares/middlewares.js";
import Admin from "../Admin/Admin.js";

const router = Router({ mergeParams: true });

router
    .get("/", isAuthenticated, getExams)


export default router;