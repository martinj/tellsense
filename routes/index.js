var db = require('../lib/db'),
	telldus = require('../lib/telldus-live'),
	moment = require('moment');

exports.index = function (req, res) {
	res.render('index', { title: 'TellSense' });
};

exports.sensorChartData = function (req, res, next) {
	var earliest = moment().subtract('days', req.params.days);

	db.getSensorInfo(req.params.id, earliest.toDate(), new Date(), function (err, data) {
		if (err) {
			next(err);
		}
		var seriesData = [];
		data.forEach(function (item) {
			seriesData.push([new Date(item.lastUpdated).getTime(), item[req.params.key]]);
		});

		res.json(seriesData);
	});

};

exports.sensor = function (req, res, next) {
	db.getSensors(function (err, sensors) {
		if (err) {
			return next(err);
		}
		res.json(sensors);
	});
};