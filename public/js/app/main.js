require({
	paths: {
		'text': '../vendor/require/text',
		'jquery': '../vendor/jquery.min',
		'jquery.tmpl': '../vendor/jquery.tmpl.min',
		'backbone': '../vendor/backbone-min',
		'bootstrap': '../vendor/bootstrap.min',
		'moment': '../vendor/moment.min',
		'underscore': '../vendor/underscore-min',
		'highcharts': '../vendor/highcharts/highcharts',
		'highstock': '../vendor/highcharts/highstock',
		'highcharts.exporting': '../vendor/highcharts/modules/exporting',
		'highcharts.more': '../vendor/highcharts/highcharts-more'
	},

	shim: {
		'jquery': { exports: '$' },
		'jquery.tmpl': ['jquery'],
		'bootstrap': ['jquery'],
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'moment': { exports: 'moment' },
		'underscore': { exports: '_' },
		'highcharts': { exports: 'HighCharts' },
		'highstock': { exports: 'HighCharts' },
		'highcharts.more': ['highcharts', 'highstock'],
		'highcharts.exporting': ['highcharts', 'highstock']
	}
},
[
	'require',
	'jquery'
],
function (require) {
	require([
		'jquery',
		'app',
		'jquery.tmpl',
		'highcharts.more',
		'highcharts.exporting',
		'bootstrap'
	], function ($, App) {
		$(function () {
			var app = new App();
			app.start();
		});
	});
});
