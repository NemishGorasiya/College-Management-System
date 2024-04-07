import redis from "redis";
import logger from "./winston.config.js";

const redisClient = redis.createClient({
  //automatically use the default port and host 
  //which are
  //port: 6379
  //host: Localhost
});

await redisClient.connect().catch(err => {
  logger.error(`Error connecting to Redis server: ${err}`);
  process.exit(1);
});

logger.info("Connected to Redis server successfully!");

export default redisClient;