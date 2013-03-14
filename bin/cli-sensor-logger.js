#!/usr/bin/env node
var config = require('../config'),
	SensorLogger = require('../lib/sensor-logger'),
	Telldus = require('../lib/telldus-live');

var logger = new SensorLogger(new Telldus(config.telldus), config.sensorLogger).start();
console.log('Logger started');