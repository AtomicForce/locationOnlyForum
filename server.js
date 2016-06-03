'use strict';

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var Router = require('./app/routes');

mongoose.connect('mongodb://localhost/locationOnlyForum');

var port = process.env.PORT || 8000;

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send(path.join(__dirname + 'index.html'));
});

app.use('/api', Router);

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Server running on port: '+ port);
    }
});
