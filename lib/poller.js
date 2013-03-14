/**
 * Create Poller instance
 * @param {Number} interval interval to poll in seconds
 */
var Poller = function (interval) {
	this.interval = (interval || 60) * 1000; //default to 1 min
	this.intervalId = null;
};

/**
 * Start Polling
 * @param  {Function} pollCallback
 */
Poller.prototype.start = function (pollCallback) {
	var self = this;

	if (this.intervalId) {
		//alread started
		return;
	}

	//run instant on start
	pollCallback();

	this.intervalId = setInterval(function () {
		pollCallback();
	}, this.interval);
};

/**
 * Stop polling
 */
Poller.prototype.stop = function () {
	clearInterval(this.intervalId);
	this.intervalId = null;
};

/**
 * Expose Poller
 */
module.exports = Poller;