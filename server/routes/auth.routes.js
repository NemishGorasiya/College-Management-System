import { Router } from 'express';
import httpStatus from 'http-status';
import adminRoutes from "./auth.admin.routes.js";
import studentRoutes from "./auth.student.routes.js";
import facultyRoutes from "./auth.faculty.routes.js";

const router = Router({ mergeParams: true });

//!PATH: /auth

router
    .use("/admin", adminRoutes)
    .use("/student", studentRoutes)
    .use("/faculty", facultyRoutes)

export default router;
