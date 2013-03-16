/**
 * Module dependencies.
 */
var express = require('express'),
	flash = require('connect-flash'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path'),
	config = require('./config'),
	passport = require('passport'),
	auth = require('./lib/auth'),
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
	app.use(express.cookieParser());
	app.use(express.session({ secret: config.sessionSecret }));
	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
	app.use(express.errorHandler());
});

app.get('/', auth.authenticate, routes.index);
app.get('/sensor', auth.authenticate, routes.sensor);
app.get('/sensor/:id/chart/:key?/:days?', auth.authenticate, routes.sensorChartData);
app.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/login');
});
app.get('/login', function (req, res) {
	res.render('login', { user: req.user, message: req.flash('error') });
});
app.post('/login',
	passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
	function (req, res) {
		res.redirect('/');
	}
);

if (config.sensorLogger.autoStart) {
	new SensorLogger(new Telldus(config.telldus), config.sensorLogger).start();
}

http.createServer(app).listen(app.get('port'), function () {
	console.log("TellSense server listening on port " + app.get('port'));
});
