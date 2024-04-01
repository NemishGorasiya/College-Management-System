import RedisStore from 'connect-redis';
import { config } from "dotenv";
import express from 'express';
import actuator from "express-actuator";
import "express-async-errors";
import session from "express-session";
import { createServer } from 'http';
import httpStatus from "http-status";
import morgan from 'morgan';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { createClient } from 'redis';
import connectDB from './config/db.config.js';
import logger from './config/winston.config.js';
import CustomError from "./errors/CustomError.js";
import { authErrorHandler, errorHandler, notFoundHandler } from "./errors/errorHandlers.js";
import { isAuthenticated } from "./middlewares/middlewares.js";
import Admin from "./modules/Admin/Admin.js";
import adminRoutes from "./modules/Admin/admin.routes.js";
import assignmentRoutes from "./modules/Assignment/assignment.routes.js";
import departmentRoutes from "./modules/Department/department.routes.js";
import examRoutes from "./modules/Exam/exam.routes.js";
import Faculty from "./modules/Faculty/Faculty.js";
import facultyRoutes from "./modules/Faculty/faculty.routes.js";
import { getProfile, userLogout } from "./modules/General/general.controller.js";
import Student from "./modules/Student/Student.js";
import studentRoutes from "./modules/Student/student.routes.js";
import subjectRoutes from "./modules/Subject/subject.routes.js";
import uploadRoutes from "./modules/Uploads/upload.routes.js";
import resultRoutes from "./modules/Result/result.routes.js";

config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;
const actuatorConfig = {
    infoGitMode: "full",
    infoBuildTime: true,
    infoDependencies: true,
    infoContributors: true,
    infoEnvironment: true,
};

//! Redis Store
const redisClient = createClient(); // automatically uses port 6379 on localhost to connect to the Redis server
redisClient.connect().catch(err => {
    logger.error(`Error connecting to Redis server: ${err}`);
    process.exit(1);
})
const RedisSessionStore = new RedisStore({
    client: redisClient,
    prefix: 'session:',
});

//setting up the middlwares for the server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('views'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, //1 day
    },
    store: RedisSessionStore     //store the session in memory
}));
app.use(actuator(actuatorConfig));

//passport middleware for the server - to authenticate the user
app.use(passport.initialize());
app.use(passport.session());
passport.use('student', new LocalStrategy(Student.authenticate())); //authenticate the student
passport.use('faculty', new LocalStrategy(Faculty.authenticate())); //authenticate the faculty
passport.use('admin', new LocalStrategy(Admin.authenticate())); //authenticate the admin
passport.serializeUser(function (user, done) {
    //Custom User Serialization
    if (user instanceof Student) {
        done(null, { enrollmentNumber: user.enrollmentNumber, type: 'student' });
    } else if (user instanceof Faculty) {
        done(null, { email: user.email, type: 'faculty' });
    } else if (user instanceof Admin) {
        done(null, { email: user.email, type: 'admin' });
    } else {
        done(new CustomError(httpStatus.INTERNAL_SERVER_ERROR, "User type not found"));
    }
});

passport.deserializeUser(function (user, done) {
    //Custom User Deserialization
    switch (user.type) {
        case 'student':
            Student.deserializeUser()(user.enrollmentNumber, done);
            break;
        case 'admin':
            Admin.deserializeUser()(user.email, done);
            break;
        case 'faculty':
            Faculty.deserializeUser()(user.email, done);
            break;
        default:
            done(new CustomError(httpStatus.INTERNAL_SERVER_ERROR, "User type not found"));
    }
});

//logger for the server - log every request to the console
app.use(morgan('dev', { stream: { write: message => logger.info(message.trim()) } }));

//routes for the server
app.get('/api/', (_, res) => {
    return res.send("Welcome to the college management system");
});

app.use('/api/admin', adminRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/my-profile', isAuthenticated, getProfile)
app.use('/api/user/logout', isAuthenticated, userLogout);

app.use('/api/department', departmentRoutes);
app.use('/api/subject', subjectRoutes);
app.use('/api/assignment', assignmentRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/exam', examRoutes);
app.use('/api/result', resultRoutes);

//auth error, normal error handlers and not found handlers
app.use('/api/error', authErrorHandler);
app.use("*", notFoundHandler);
app.use(errorHandler);

//starting the server
async function start() {
    //connect to the database
    await connectDB();

    //start listening to the server
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    const shutdownHandler = () => {
        logger.info(`shutting down the server`);
        server.close(() => {
            logger.info("Server is shut down");
            process.exit(0);
        });
    }

    //graceful shutdown
    process.on('SIGINT', shutdownHandler);
    process.on('SIGTERM', shutdownHandler);
    process.on('uncaughtException', shutdownHandler);
    process.on('unhandledRejection', shutdownHandler);
};

start();