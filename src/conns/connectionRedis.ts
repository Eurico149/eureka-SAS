import Redis from 'ioredis';


const redis = new Redis({
    host: process.env.REDIS_HOST ?? 'redis',
    port: +(process.env.REDIS_PORT ?? 6379),
    password: process.env.REDIS_PASSWORD ?? 'redispassword'
});

export default redis;