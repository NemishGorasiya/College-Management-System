import morgan from 'morgan';
import express from 'express';
import { createServer } from 'http';
import { config } from "dotenv"
import connectDB from './config/db.config.js';
import logger from './config/winston.config.js';
config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

//setting up the middlwares for the server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('views'));

//logger for the server - log every request to the console
app.use(morgan('dev', { stream: { write: message => logger.info(message.trim()) } }));

//routes for the server
app.get('/', (_, res) => {
    res.send("Hello, World!");
});

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