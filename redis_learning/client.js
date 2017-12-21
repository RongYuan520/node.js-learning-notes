var redis = require("redis");

var client = redis.createClient(6379,'localhost');

exports.client = client;
