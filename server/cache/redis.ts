import Redis from "ioredis";

 const redis: Redis = new Redis(process.env.REDIS_URL, {
    tls: {
      rejectUnauthorized: false
    },
    retryStrategy: null
});
redis.on('connect', ()=> {
  console.warn('Connected to redis');
})
redis.on('end', () => {
    console.warn('shutting down service due to lost Redis connection');
  });

export {redis}