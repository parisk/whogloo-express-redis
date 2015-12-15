var express = require('express');
var router = express.Router();
var redis = require('redis');

var client = redis.createClient({host: 'redis', port: '6379'});

client.on('connect', function() {
    console.log('connected');
});

/* GET home page. */
router.get('/', function(req, res, next) {
    client.get('counter', function(err, value) {
        value = parseInt(value);
        if (isNaN(value)) {
            value = 0;
        }
        client.set('counter', value + 1);
        res.render('index', {title: 'Express: ' + value});
    });
});

module.exports = router;
