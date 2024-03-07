import { config } from "dotenv";
import express from 'express';
import session from "express-session";
import { createServer } from 'http';
import morgan from 'morgan';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import connectDB from './config/db.config.js';
import logger from './config/winston.config.js';
import User from "./models/User.js";
import authRoutes from "./routes/auth.routes.js";
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
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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