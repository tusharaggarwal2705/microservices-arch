const redis=require('redis');
const util=require('util');

redisClient=redis.createClient();

redisClient.get=util.promisify(redisClient.get);

exports.clearRedisCacheCron=()=>{

}