const redis = require('redis');
const moment = require('moment');
const util = require('util');

const redisClient = redis.createClient();
const WINDOW_SIZE_IN_HOURS = 12;
const MAX_WINDOW_REQUEST_COUNT = 100;

redisClient.get = util.promisify(redisClient.get);

//token bucket algorithm

exports.customRedisRateLimiter = async (req, res, next) => {
    try {
        // check that redis client exists
        if (!redisClient) {
            throw new Error('Redis client does not exist!');
            // process.exit(1);
        }
        console.log(redisClient);
        // fetch record of current user using IP address, returns null when no record is found

        let record = await redisClient.get(req.ip);
        const currentRequestTime = moment();
        console.log(record);
        // record does not exist
        if (!record) {
            let newRecord = {
                timeStamp: currentRequestTime.unix(),
                tokens: MAX_WINDOW_REQUEST_COUNT
            };
            await redisClient.set(req.ip, JSON.stringify(newRecord));
            next();
        }
        let data = JSON.parse(record);
        let windowStartTimeStamp = moment().subtract(WINDOW_SIZE_IN_HOURS, 'hours').unix();
        
        if (windowStartTimeStamp > data.timeStamp) {  
            //record exists but the window is elapsed , update the record with new set of tokens

            let updatedRecord = {
                timestamp: currentRequestTime.unix(),
                tokens: MAX_WINDOW_REQUEST_COUNT
            }
            await redisClient.set(req.ip, JSON.stringify(updatedRecord));
            next();
        } else if (windowStartTimeStamp <= data.timeStamp && 0 < data.tokens <= 100) { 
            //record exists & tokens are left in bucket , 
            // decrement the token count & update the record 

            let updatedRecord = {
                timeStamp=data.timestammp,
                tokens: data.tokens - 1
            }
            redisClient.set(req.ip, JSON.stringify(updatedRecord));
            next();
        } else if (windowStartTimeStamp <= data.timeStamp && data.tokens == 0) {
            //more requests in window size than rate limit exceeded

            res
                .status(429)
                .jsend.error(
                    `You have exceeded the ${MAX_WINDOW_REQUEST_COUNT} requests in ${WINDOW_SIZE_IN_HOURS} hrs limit!`
                );
        }
    } catch (error) {
        next(error);
    }
};

redisClient.on("error", (err) => {
    console.log(err);
})