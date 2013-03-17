define(function (require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		template = $.template(null, require('text!templates/home.html')),
		moment = require('moment'),
		HighCharts = require('highcharts');

	/**
	 * Creates a new instance of this view class.
	 * @constructor
	 */
	return Backbone.View.extend({
		className: 'container',

		/**
		 * Will be called when creating the instance.
		 */
		initialize: function () {
		},

		/**
		 * Render the HTML for this view
		 */
		render: function () {
			this.$el.html($.tmpl(template, { moment: moment, sensors: this.collection.toJSON() }));
			return this;
		}
	});
});