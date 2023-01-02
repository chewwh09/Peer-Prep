const Redis = require("redis");

const DEFAULT_EXPIRATION = 3600;
let redisClient = null;

const initiateRedis = () => {
  console.log("Initiating Redis");
  redisClient = Redis.createClient({ host: "redis" });
};

const getRedisCacheValue = (key, callback) => {
  if (!redisClient) return { error: "Redis hasn't been initiated." };

  return new Promise((resolve, reject) => {
    redisClient.get(key, async (error, data) => {
      if (error) return reject("Redis couldn't fetch data.");
      if (data) return resolve(JSON.parse(data));

      try {
        const newUser = await callback();
        setRedisCache(key, newUser);
        return resolve(newUser);
      } catch (e) {
        reject("Error in callback");
      }
    });
  });
};

const setRedisCache = (key, data) => {
  if (!redisClient) return { error: "Redis hasn't been initiated." };

  try {
    redisClient.setex(key, DEFAULT_EXPIRATION, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};

const deleteRedisCacheKey = (key) => {
  return redisClient.del(key);
};

module.exports = { initiateRedis, getRedisCacheValue, deleteRedisCacheKey };
