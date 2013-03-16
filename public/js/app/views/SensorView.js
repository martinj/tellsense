define(function (require) {
	var $ = require('jquery'),
		Backbone = require('backbone'),
		template = $.template(null, require('text!templates/sensor.html')),
		HighCharts = require('highstock');

	/**
	 * Creates a new instance of this view class.
	 * @constructor
	 */
	return Backbone.View.extend({
		className: 'container-fluid',

		/**
		 * Render the HTML for this view
		 */
		render: function () {
			var self = this;
			this.$el.html($.tmpl(template, { sensor: this.model.toJSON() }));
			return this;
		},

		/**
		 * Render chart
		 */
		renderChart: function () {
			if (this.chart) {
				//cleanup old chart
				this.chart.destroy();
			}

			var $div = $('<div>');
			this.$('.chart-container').html($div);

			this.chart = new Highcharts.StockChart({
				chart: {
					type: 'spline',
					renderTo: $div.get(0),
					zoomType: 'x'
				},
				rangeSelector: {
					buttons: [{
						type: 'day',
						count: 1,
						text: '1d'
					}, {
						type: 'week',
						count: 1,
						text: '1w'
					}, {
						type: 'month',
						count: 1,
						text: '1m'
					}, {
						type: 'month',
						count: 6,
						text: '6m'
					}, {
						type: 'year',
						count: 1,
						text: '1y'
					}, {
						type: 'all',
						text: 'All'
					}],
					selected: 3
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
				yAxis: [{
					labels: {
						formatter: function () {
							return this.value.toFixed(1) + '°C';
						},
						style: {
							color: '#A00000'
						}
					},
					title: {
						text: 'Temperature',
						style: {
							color: '#A00000'
						}
					}
				}, {
					title: {
						text: 'Humidity',
						style: {
							color: '#4572A7'
						}
					},
					labels: {
						formatter: function () {
							return this.value.toFixed(1) + '%';
						},
						style: {
							color: '#4572A7'
						}
					},
					opposite: true
				}],
				tooltip: {
					formatter: function () {
						return Highcharts.dateFormat('%a %Y-%m-%d %H:%M', this.x) + '<br>' +
							'Temperature: ' + this.points[0].y.toFixed(1) + '°C<br>' +
							'Humidity: ' + this.points[1].y.toFixed(1) + '%';
					}
				},
				legend: {
					layout: 'vertical',
					align: 'left',
					x: 90,
					verticalAlign: 'top',
					y: 40,
					floating: true,
					enabled: true,
					backgroundColor: '#FFFFFF'
				},
				series: [{
					name: 'Temperature',
					data: this.model.get('chartData').temp,
					color: '#A00000'
				}, {
					name: 'Humididty',
					yAxis: 1,
					data: this.model.get('chartData').humidity,
					color: '#4572A7'
				}]
			});
		}
	});
});