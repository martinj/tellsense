define(function (require) {
	/**
	 * Required modules.
	 */
	var Backbone = require('backbone'),
		Model = require('models/SensorModel');

	/**
	 * Creates a new instance of this collection class.
	 */
	return Backbone.Collection.extend({
		model: Model,
		url: '/sensor'
	});
});