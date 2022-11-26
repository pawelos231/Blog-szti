import Redis from "ioredis";

 const redis = new Redis(process.env.REDIS_URL, {
    tls: {
      rejectUnauthorized: false
    },
    retryStrategy: null
});
redis.on('end', () => {
    console.warn('shutting down service due to lost Redis connection');
  });
redis.set("foo", "bar")

export {redis}