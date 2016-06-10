// require npm =================================================
var express        = require('express');
var server         = express();
var bodyParser     = require('body-parser');
var chalk          = require('chalk');
var config         = require('./config/config');

//body parser to use for POST request
server.use(bodyParser.json());

// parse server aplication/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));

// parse serverlication/vnd.api+json as json
server.use(bodyParser.json({ type: 'serverlication/vnd.api+json' }));

// start server ===============================================
server.listen(config.serverNetwork.pushServer_private.port);
console.log(chalk.bgGreen('listening at: ',config.serverNetwork.pushServer_private.port));

require('./router')(server);