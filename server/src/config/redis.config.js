import redis from "redis";
import logger from "./winston.config.js";
import { config } from "dotenv";
config();

const redisClient = redis.createClient({
	//automatically use the default port and host
	//which are
	//port: 6379
	//host: Localhost
	// url: process.env.REDIS_URL,
	password: process.env.REDIS_PASSWORD,
	socket: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
	},
});

await redisClient.connect().catch((err) => {
	logger.error(`Error connecting to Redis server: ${err}`);
	process.exit(1);
});

logger.info("Connected to Redis server successfully on Free Redis Cloud");

export default redisClient;
