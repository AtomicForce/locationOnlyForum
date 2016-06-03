'use strict';

var express = require('express');
var Thread = require('./models/threadModel');
var mongoose = require('mongoose');
var Router = express.Router();

var radiusLatMax = 0;
var radiusLatMin = 0;
var radiusLonMax = 0;
var radiusLonMin = 0;

Router.use(function(req, res, next) {
    console.log('hitting the middleware: lat - ' + req.query.lat + ', lon - ' + req.query.lon);

    radiusLatMax = parseFloat(req.query.lat) + 0.0050000;
    radiusLatMin = parseFloat(req.query.lat) - 0.0050000;
    radiusLonMax = parseFloat(req.query.lon) + 0.0030000;
    radiusLonMin = parseFloat(req.query.lon) - 0.0030000;

    next();
});

Router.get('/threads', function(req, res) {
    var Thread = mongoose.model('Thread', Thread);

    Thread.find({
        "coords.lat": {
            $lte: radiusLatMax,
            $gte: radiusLatMin
        },
        "coords.lon": {
            $lte: radiusLonMax,
            $gte: radiusLonMin
        }
    }, function(err, thread) {
        if(err) res.send(err);

        res.json(thread);
    });

});

Router.post('/createThread', function(req, res) {
    const thread = new Thread({
        nickname: req.body.nick,
        title: req.body.threadTitle,
        description: req.body.threadText,
        coords: {
            lat: req.query.lat,
            lon: req.query.lon
        }
    });

    thread.save(function(err) {
        if (err) return res.send(err);

        res.send('done');
    });
});

module.exports = Router;
