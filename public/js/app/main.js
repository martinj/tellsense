require({
	paths: {
		'text': '../vendor/require/text',
		'jquery': '../vendor/jquery.min',
		'jquery.tmpl': '../vendor/jquery.tmpl.min',
		'backbone': '../vendor/backbone-min',
		'bootstrap': '../vendor/bootstrap.min',
		'underscore': '../vendor/underscore-min',
		'highcharts': '../vendor/highcharts/highcharts',
		'highstock': '../vendor/highcharts/highstock',
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
		'underscore': { exports: '_' },
		'highcharts': { exports: 'HighCharts' },
		'highstock': { exports: 'HighCharts' },
		'highcharts.more': ['highcharts', 'highstock']
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
		'bootstrap'
	], function ($, App) {
		$(function () {
			var app = new App();
			app.start();
		});
	});
});
