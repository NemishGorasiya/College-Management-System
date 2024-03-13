import { config } from "dotenv";
import express from 'express';
import session from "express-session";
import { createServer } from 'http';
import morgan from 'morgan';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import connectDB from './config/db.config.js';
import logger from './config/winston.config.js';
import authRoutes from "./routes/auth.routes.js";
import Student from "./models/Student.js";
import Faculty from "./models/Faculty.js";
import Admin from "./models/Admin.js";
config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

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
    }
}));

//passport middleware for the server - to authenticate the user
app.use(passport.initialize());
app.use(passport.session());
passport.use('student', new LocalStrategy(Student.authenticate())); //authenticate the student
passport.use('faculty', new LocalStrategy(Faculty.authenticate())); //authenticate the faculty
passport.use('admin', new LocalStrategy(Admin.authenticate())); //authenticate the admin
passport.serializeUser(function (user, done) {
    let userGroup;
    if (user instanceof Student) {
        userGroup = "student";
    } else if (user instanceof Faculty) {
        userGroup = "faculty";
    } else {
        userGroup = "admin";
    }
    done(null, { id: user.id, userGroup });
});
passport.deserializeUser(function (id, done) {
    if (id.userGroup === "student") {
        Student.deserializeUser()(id.id, done);
    } else if (id.userGroup === "faculty") {
        Faculty.deserializeUser()(id.id, done);
    } else if (id.userGroup === "admin") {
        Admin.deserializeUser()(id.id, done);
    }
    else {
        done(new Error("User Group not found"), null);
    }
});

//logger for the server - log every request to the console
app.use(morgan('dev', { stream: { write: message => logger.info(message.trim()) } }));

//routes for the server
app.get('/', (_, res) => {
    res.send("Hello, World!");
});

app.use('/auth', authRoutes);

//error handlers and not found handlers


//starting the server
async function start() {
    //connect to the database
    await connectDB();

    //start listening to the server
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

start();