import Redis from "ioredis";

export const redis: Redis = new Redis(process.env.REDIS_URL);
