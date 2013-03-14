define(function (require) {

	/**
	 * Required modules.
	 */
	var Backbone = require('backbone'),
		$ = require('jquery');

	/**
	 * Creates a new instance of this model class.
	 */
	return Backbone.Model.extend({
		defaults: {},
		initialize: function () {

		},

		fetchChartData: function (type, days) {
			var self = this;
			days = days || 365;
			type = type || 'temp';
			return $.get('/sensor/' + this.id + '/chart/' + type + '/' + days, function (data) {
				self.set('chartData', data);
			});
		}
	});
});