/**
 * Module dependencies
 */
var OAuth = require('oauth').OAuth;

/**
 * Constructor
 * @param {Object} options
 */
function Telldus(options) {
	this.baseUrl = options.baseUrl || 'http://api.telldus.com/json';
	this.oauth = new OAuth(
		null,
		null,
		options.publicKey,
		options.privateKey,
		'1.0',
		null,
		'HMAC-SHA1'
	);

	this.token = options.token;
	this.tokenSecret = options.tokenSecret;
}

/**
 * Make a get request to a specific endpoint
 * @param  {String}   endPoint e.g /sensors/list
 * @param  {Function} callback
 */
Telldus.prototype.get = function (endPoint, callback) {
	this.oauth.get(this.baseUrl + endPoint, this.token, this.tokenSecret,  function (error, data) {
		if (error) {
			callback(error, data);
			return;
		}

		var json;
		try {
			json = JSON.parse(data);
		} catch (ex) {
			return callback(ex);
		}

		if (json.error) {
			callback(json.error);
		}

		callback(false, json);
	});
};

/**
 * Get Sensors (/sensors/list)
 * @param  {Boolean|Function} ignored  include ignored sensors or callback
 * @param  {Function} cb
 */
Telldus.prototype.sensorsList = function (ignored, cb) {
	if ('function' === typeof ignored) {
		cb = ignored;
		ignored = false;
	}

	return this.get('/sensors/list' + (ignored ? '?includeIgnored=1' : ''), cb);
};

/**
 * Get sensor info (/sensor/info)
 * @param  {Number}   id sensor id
 * @param  {Function} cb
 */
Telldus.prototype.sensorInfo = function (id, cb) {
	return this.get('/sensor/info?id=' + id, cb);
};

/**
 * Expose Telldus
 */
module.exports = Telldus;
