var express = require('express');
var router = express.Router();
var cache = require('memory-cache');

/* GET home page. */

router.get('/', function(req, res, next) {

    var data;
    var username = cache.get('username');
    var pts = cache.get('points');
    if(username != null && pts != null){
        console.log("cache size: " + cache.size());
        data ={
            username: username,
            points: pts,
            rend: '1'
        }
    }else{
        data ={
            username: "",
            points: "",
            rend: '0'
        }
    }
    res.render('index', { data: data});
});

router.post('/', function(req, res, next) {

    var data ={
        username: req.body.username,
        points: req.body.points,
        rend: '0'
    };

    cache.put('username', data.username);
    cache.put('points', data.points);
    cache.put('timestamp', Date.now());

    res.render('index', { data: data});

});

module.exports = router;
