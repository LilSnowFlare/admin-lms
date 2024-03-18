const { Redis } = require("ioredis");
require("dotenv").config();

const redisClient = () =>{
    if(process.env.REDIS_URL){
        console.log(`Redis connected Successfully`)
        return process.env.REDIS_URL;
    }
    throw new Error(`Redis connection failed`)
}
exports.redisClient = new Redis(redisClient());