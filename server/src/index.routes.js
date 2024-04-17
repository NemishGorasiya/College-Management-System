import { Router } from 'express';
import adminRoutes from "./modules/Admin/admin.routes.js";
import assignmentRoutes from "./modules/Assignment/assignment.routes.js";
import circularRoutes from "./modules/Circulars/circular.routes.js";
import departmentRoutes from "./modules/Department/department.routes.js";
import eventRoutes from "./modules/Events/events.routes.js";
import examRoutes from "./modules/Exam/exam.routes.js";
import facultyRoutes from "./modules/Faculty/faculty.routes.js";
import generalUserRoutes from "./modules/General/general.routes.js";
import resultRoutes from "./modules/Result/result.routes.js";
import studentRoutes from "./modules/Student/student.routes.js";
import subjectRoutes from "./modules/Subject/subject.routes.js";
import uploadRoutes from "./modules/Uploads/upload.routes.js";
import { authErrorHandler, errorHandler, notFoundHandler } from "./errors/errorHandlers.js";
import { isAuthenticated } from "./middlewares/middlewares.js";

const router = Router();

//!PATH - /

router.get('/user/validate-otp', (req, res) => {
    return res.send({
        message: "Change password page",
        description: "This is the page where the user will change the password",
    });
})

router.get('/api/', (_, res) => {
    return res.send("Welcome to the college management system");
});

router.use('/api/admin', adminRoutes);
router.use('/api/faculty', facultyRoutes);
router.use('/api/student', studentRoutes);
router.use('/api/user', isAuthenticated, generalUserRoutes);

router.use('/api/department', departmentRoutes);
router.use('/api/subject', subjectRoutes);
router.use('/api/assignment', assignmentRoutes);
router.use('/api/uploads', uploadRoutes);
router.use('/api/exam', examRoutes);
router.use('/api/result', resultRoutes);
router.use('/api/circular', circularRoutes);
router.use('/api/events', eventRoutes);

//auth error, normal error handlers and not found handlers
router.use('/api/error', authErrorHandler);
router.use("*", notFoundHandler);
router.use(errorHandler);

export default router;