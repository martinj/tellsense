
/**
 * Module dependencies.
 */
var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path'),
	config = require('./config'),
	SensorLogger = require('./lib/sensor-logger'),
	Telldus = require('./lib/telldus-live');


var app = express();

app.configure(function () {
	app.set('port', config.port);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
	app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/sensor', routes.sensor);
app.get('/sensor/:id/chart/:key?/:days?', routes.sensorChartData);

if (config.sensorLogger.autoStart) {
	new SensorLogger(new Telldus(config.telldus), config.sensorLogger).start();
}

http.createServer(app).listen(app.get('port'), function () {
	console.log("TellSense server listening on port " + app.get('port'));
});
