import { Redis } from "ioredis";
import RedisService from "./RedisService";
import { REDIS_PORT } from "src/utils/config/config";

const redis = new RedisService();

export const publisher = new RedisService();
export const subscriber = new RedisService();

export default redis;
