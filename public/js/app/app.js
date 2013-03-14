define(function (require) {

	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		HomeView = require('views/HomeView'),
		SensorView = require('views/SensorView'),
		TopMenuView = require('views/TopMenuView'),
		SensorCollection = require('collections/SensorCollection');

	return Backbone.Router.extend({
		routes: {
			'': 'home',
			'sensor/:id/:type/:days': 'sensor'
		},

		/**
		 * Constructor
		 */
		initialize: function () {
			this.$mainDiv = $('#content');
			this.topMenuView = new TopMenuView({ router: this });
			this.sensorViews = {};
			this.sensors = new SensorCollection();
			this.homeView = new HomeView({ collection: this.sensors });
		},

		/**
		 * Bootstrapping the app
		 */
		start: function () {
			$('body').prepend(this.topMenuView.render().el);
			this.sensors.fetch().then(function () {
				Backbone.history.start({pushState: false});
			});
		},

		/**
		 * Home / Dashboard route
		 */
		home: function () {
			this.$mainDiv.html(this.homeView.render().el);
			this.homeView.renderSensorGauges();
		},

		/**
		 * Sensor route
		 * @param  {Number} id   the sensor id
		 * @param  {String} type the sensor value key
		 * @param  {Number} days how far back to fetch
		 */
		sensor: function (id, type, days) {
			var self = this,
				model = this.sensors.get(id),
				view = this.sensorViews[id];

			if (!view) {
				view = new SensorView({ model: model, router: this });
				this.sensorViews[id] = view;
			}

			this.$mainDiv.html(view.render().el);
			model.fetchChartData(type, days).then(function () {
				view.renderChart();
			});
		}
	});

});