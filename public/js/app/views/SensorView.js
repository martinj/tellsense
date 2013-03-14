define(function (require) {
	var $ = require('jquery'),
		Backbone = require('backbone'),
		template = $.template(null, require('text!templates/sensor.html')),
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
		initialize: function (options) {
			this.listenTo(options.router, 'route:sensor', this.updateActiveMenu);
		},

		/**
		 * Render the HTML for this view
		 */
		render: function () {
			var self = this;
			this.$el.html($.tmpl(template, { sensor: this.model.toJSON() }));
			return this;
		},

		/**
		 * Update sidebar menus active link,
		 * it recieves data from the route event
		 * @param  {Number} id
		 * @param  {String} type
		 * @param  {Number} days
		 */
		updateActiveMenu: function (id, type, days) {
			this.$('ul.nav li').removeClass('active');
			this.$('ul.nav li.' + type + '[data-days=' + days + ']').addClass('active');
		},

		/**
		 * Render chart
		 */
		renderChart: function () {
			if (this.chart) {
				//cleanup old chart
				this.chart.destroy();
			}

			// var series = this.model.get('chartData').filter(function (item, i) {
			// 	return i % 10 == 0;
			// });

			var $div = $('<div>');
			this.$('.chart-container').html($div);

			this.chart = new Highcharts.Chart({
				chart: {
					renderTo: $div.get(0),
					type: 'spline',
					zoomType: 'x'
					// marginRight: 130,
					// marginBottom: 30
				},
				lineWidth: 1,
				plotOptions: {
					series: {
						marker: {
							radius: 2
						}
					}
				},
				title: {
					text: 'Sensor Temperature',
					x: -20 //center
				},
				xAxis: {
					type: 'datetime',
					dateTimeLabelFormats: {
						minute: '%H:%M',
						hour: '%H. %M',
						month: '%e. %b',
						year: '%b'
					}
				},
				yAxis: {
					title: {
						text: 'Temperature (°C)'
					}
				},
				tooltip: {
					formatter: function () {
						return '<b>' + this.series.name + '</b><br/>' +
						Highcharts.dateFormat('%a %y-%m-%d %H:%M', this.x) + ': ' + this.y + '°C';
					}
				},
				series: [{
					name: 'Fermentation Fridge',
					// data: series
					data: this.model.get('chartData')
				}]
			});
		}
	});
});