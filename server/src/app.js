import RedisStore from 'connect-redis';
import cors from "cors";
import { config } from "dotenv";
import express from 'express';
import actuator from "express-actuator";
import "express-async-errors";
import session from "express-session";
import status from "express-status-monitor";
import { createServer } from 'http';
import httpStatus from "http-status";
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import connectDB from './config/db.config.js';
import redisClient from "./config/redis.config.js";
import logger from './config/winston.config.js';
import CustomError from "./errors/CustomError.js";
import indexRoutes from "./index.routes.js";
import Admin from "./modules/Admin/Admin.js";
import Faculty from "./modules/Faculty/Faculty.js";
import Student from "./modules/Student/Student.js";
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
app.use(cors({
    origin: [...process.env.CLIENT_URL.split(",")] || "http://localhost:5173",
    credentials: true,
}))
app.use(actuator(actuatorConfig));
app.use(status());

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
//!NOTE: these are just for testing purposes - will remove later
app.use("/", indexRoutes);

//starting the server
async function start() {
    try {
        //connect to the database
        await connectDB();

        //start listening to the server
        server.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });

        const shutdownHandler = async () => {
            logger.info(`shutting down the server`);
            //close the mongoose connection
            mongoose.disconnect(() => {
                logger.info("Database disconnected successfully")
            })

            //close the redis client
            await redisClient.quit();

            //close the server
            server.close(() => {
                logger.info("Server is shut down");
                process.exit(0);
            });
        }

        //graceful shutdown
        process.on('SIGINT', shutdownHandler);
        process.on('SIGTERM', shutdownHandler);
    } catch (err) {
        logger.error(`Error starting the server: ${err}`);
        process.exit(1);

    }
};

export default app;
start();