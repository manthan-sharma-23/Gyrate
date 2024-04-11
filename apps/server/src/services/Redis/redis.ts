import { Redis } from "ioredis";
import RedisService from "./RedisService";
import { REDIS_PORT } from "src/utils/config/config";

const redis = new RedisService().client;

export const publisher = new RedisService().client;
export const subscriber = new RedisService().client;

export default redis;
