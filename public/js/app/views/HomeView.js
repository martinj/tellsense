define(function (require) {
	var $ = require('jquery'),
		Backbone = require('backbone'),
		template = $.template(null, require('text!templates/home.html')),
		HighCharts = require('highcharts');

	/**
	 * Creates a new instance of this view class.
	 * @constructor
	 */
	return Backbone.View.extend({
		className: 'container-fluid',

		/**
		 * Will be called when creating the instance.
		 */
		initialize: function () {
		},

		/**
		 * Render the HTML for this view
		 */
		render: function () {
			this.$el.html($.tmpl(template, { sensors: this.collection.toJSON() }));
			return this;
		},

		/**
		 * Render gauges for all sensors in collection
		 */
		renderSensorGauges: function () {
			this.collection.each(function (model) {
				this.createGauge(model);
			}, this);
		},

		/**
		 * Creates a sensor gauge
		 * @param  {SensorModel} model
		 * @return {Highcharts.Chart}
		 */
		createGauge: function (model) {
			var data = [model.get('latestReading').temp];

			return new Highcharts.Chart({
				chart: {
					renderTo: 'sensor-temp-' + model.id,
					type: 'gauge',
					plotBackgroundColor: null,
					plotBackgroundImage: null,
					plotBorderWidth: 0,
					plotShadow: false
				},

				title: {
					text: model.get('name') + ' Temp'
				},

				pane: {
					startAngle: -150,
					endAngle: 150,
					background: [{
						backgroundColor: {
							linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
							stops: [
								[0, '#FFF'],
								[1, '#333']
							]
						},
						borderWidth: 0,
						outerRadius: '109%'
					}, {
						backgroundColor: {
							linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
							stops: [
								[0, '#333'],
								[1, '#FFF']
							]
						},
						borderWidth: 1,
						outerRadius: '107%'
					}, {
					// default background
					}, {
						backgroundColor: '#DDD',
						borderWidth: 0,
						outerRadius: '105%',
						innerRadius: '103%'
					}]
				},

				// the value axis
				yAxis: {
					min: -10,
					max: 50,
					minorTickInterval: 'auto',
					minorTickWidth: 1,
					minorTickLength: 10,
					minorTickPosition: 'inside',
					minorTickColor: '#666',

					tickPixelInterval: 30,
					tickWidth: 2,
					tickPosition: 'inside',
					tickLength: 10,
					tickColor: '#666',
					labels: {
						step: 2,
						rotation: 'auto'
					},
					plotBands: [{
						from: -10,
						to: 10,
						color: '#4f9eff'
					}, {
						from: 10,
						to: 25,
						color: '#55BF3B' // green
					}, {
						from: 25,
						to: 35,
						color: '#DDDF0D' // yellow
					}, {
						from: 35,
						to: 50,
						color: '#DF5353' // red
					}]
				},

				series: [{
					name: 'Temperature',
					data: data,
					dataLabels: {
						formatter: function () {
							return this.y + ' °C';
						}
					},
					tooltip: {
						valueSuffix: ' °C'
					}
				}]
			});
		}
	});
});