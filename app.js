var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var config = require('./config').get(process.env.NODE_ENV);

// REQUEST SETTINGS  ------------------------------------------ //
app.use(bodyParser.urlencoded({ limit: '2mb',extended: true }));
app.use(bodyParser.json({ limit: '2mb',extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    return next();
});

// PORT ------------------------------------------------------- //
var port = process.env.PORT || config.port;
app.listen(port);

console.log("Escuchando puerto: " + port);



// ROUTES //
app.use('/files', require('./routes/files.route'));
