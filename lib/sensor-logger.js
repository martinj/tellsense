/**
 * Module dependecies
 */
var Poller = require('./poller'),
	db = require('./db'),
	debug = require('debug')('SensorLogger');

/**
 * Intialize SensorLogger instance
 * @param {Telldus} telldus telldus live instance
 * @param {Object} [opts]
 */
function SensorLogger(telldus, opts) {
	this.opts = opts || {};
	this.opts.sensorInterval = this.opts.sensorInterval || 300;
	this.opts.infoInterval = this.opts.infoInterval || 300;
	this.telldus = telldus;

	this.infoPollers = {};
	this.sensors = [];
	this.sensorPoller = new Poller(this.opts.sensorInterval);
}

/**
 * Start the sensor logging
 */
SensorLogger.prototype.start = function () {
	debug('Starting SensorPoller');
	var self = this;

	this.sensorPoller.start(function () {
		self.fetchSensors();
	});
};

/**
 * Stop all logging
 */
SensorLogger.prototype.stop = function () {
	var self = this;
	this.sensorPoller.stop();
	Object.keys(this.infoPollers).forEach(function (id) {
		self.infoPollers[id].stop();
	});
};

/**
 * Add and start a new poller for a sensor
 * @api private
 */
SensorLogger.prototype.addInfoPoller = function (sensor) {
	if (this.infoPollers[sensor.id]) {
		return;
	}

	debug('Adding poller for %s', sensor.name);

	var self = this,
		poller = new Poller(this.opts.infoInterval);

	poller.start(function () {
		self.fetchSensorInfo(sensor.id);
	});
	this.infoPollers[sensor.id] = poller;
};

/**
 * Fetch info for a sensor and store it
 * @param  {Number} id sensor id
 * @api private
 */
SensorLogger.prototype.fetchSensorInfo = function (id) {
	this.telldus.sensorInfo(id, function (err, info) {
		if (err) {
			return console.error(err);
		}
		debug('Saved readings for %s', info.name);
		db.saveSensorInfo(info);
	});
};

/**
 * Fetch new list of sensors and store them
 * @api private
 */
SensorLogger.prototype.fetchSensors = function () {
	var self = this;

	this.telldus.sensorsList(function (err, sensors) {
		if (err) {
			return console.error(err);
		}
		debug('Sensors updated');
		self.sensors = sensors.sensor;
		db.saveSensors(sensors);
		self.sensors.forEach(function (sensor) {
			self.addInfoPoller(sensor);
		});
	});
};

/**
 * Expose SensorLogger
 */
module.exports = SensorLogger;