/**
 * Module dependencies.
 */
var when = require('when'),
	config = require('../config'),
	db = require('monk')(config.mongodb.uri),
	sensorsCol = db.get('sensors'),
	readingsCol = db.get('sensor_readings');

//run ensureIndex once
readingsCol.index('id lastUpdated');

/**
 * Convert the data array from sensorInfo results to key:value object
 * @param  {Array} data sensorInfo.data
 * @return {Object}
 */
function convertDataInfoArray(data) {
	var obj = {};
	data.forEach(function (item) {
		obj[item.name] = parseFloat(item.value);
	});
	return obj;
}

/**
 * Get all sensors
 * @param  {Function} cb callback
 */
exports.getSensors = function (cb) {
	sensorsCol.find({}, cb);
};

/**
 * Save or Update sensors
 * @param  {Object}   sensors sensor list results from telldus
 * @param  {Function} cb
 */
exports.saveSensors = function (sensors, cb) {
	sensors = sensors.sensor;
	var deferreds = [],
		docs = [];

	sensors.forEach(function (sensor) {
		sensor.id = parseInt(sensor.id, 10);
		var defer = when.defer();
		deferreds.push(defer);
		sensorsCol.update({ id: sensor.id }, { $set: sensor }, { upsert: true }, function (err, doc) {
			if (err) {
				defer.reject(err);
			}

			docs.push(doc);
			defer.resolve(doc);
		});
	});

	when.all(deferreds).then(
		function () {
			if (cb) {
				cb(false, docs);
			}
		},
		function (err) {
			if (cb) {
				cb(err);
			}
		}
	);
};

/**
 * Save new sensors info reading
 * This function will not store duplicate readings e.g it will check lastUpdated
 *
 * @param  {Object} sensorInfo sensorInfo result from telldus
 * @param  {Function} cb
 */
exports.saveSensorInfo = function (sensorInfo, cb) {
	var self = this;
	sensorInfo.id = parseInt(sensorInfo.id, 10);
	readingsCol.findOne({
		id: sensorInfo.id,
		lastUpdated: new Date(sensorInfo.lastUpdated * 1000)
	}, function (err, doc) {
		if (doc) {
			if (cb) {
				cb(err, doc);
			}
			return;
		}

		self.updateLatestReading(sensorInfo);
		var data = convertDataInfoArray(sensorInfo.data);
		data.id = sensorInfo.id;
		data.lastUpdated = new Date(sensorInfo.lastUpdated * 1000);
		readingsCol.insert(data, cb);
	});
};

/**
 * Update the latest reading info in the sensors collection
 * @param  {Object}   sensorInfo sensorInfo result from telldus
 * @param  {Function} cb         callback
 */
exports.updateLatestReading = function (sensorInfo, cb) {
	var latestReading = convertDataInfoArray(sensorInfo.data);
	latestReading.lastUpdated = new Date(sensorInfo.lastUpdated * 1000);

	sensorsCol.findAndModify(
		{ id: parseInt(sensorInfo.id, 10)},
		{ $set: { latestReading: latestReading } },
		cb
	);
};

/**
 * getSensorInfo
 * @param  {Number}   id  sensor id
 * @param  {String|Function}   gte date string sensor info greater than, or callback function
 * @param  {String}   [lte] date string, sensor info less then
 * @param  {Function} cb  callback
 */
exports.getSensorInfo = function (id, gte, lte, cb) {
	id = parseInt(id, 10);
	if ('function' === typeof gte) {
		cb = gte;
		gte = lte = false;
	}

	var query = { id: id },
		lastUpdated = {};
	if (gte) {
		lastUpdated.$gte = new Date(gte);
	}

	if (lte) {
		lastUpdated.$lte = new Date(lte);
	}

	if (lte || gte) {
		query.lastUpdated = lastUpdated;
	}

	readingsCol.find(query, { sort: 'lastUpdated' }, cb);
};
