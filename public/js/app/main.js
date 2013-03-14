require({
	paths: {
		'text': '../vendor/require/text',
		'jquery': '../vendor/jquery.min',
		'jquery.tmpl': '../vendor/jquery.tmpl.min',
		'backbone': '../vendor/backbone-min',
		'underscore': '../vendor/underscore-min',
		'highcharts': '../vendor/highcharts/highcharts',
		'highcharts.more': '../vendor/highcharts/highcharts-more'
	},

	shim: {
		'jquery': { exports: '$' },
		'jquery.tmpl': ['jquery'],
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'underscore': { exports: '_' },
		'_highcharts': { exports: 'HighCharts' },
		'highcharts.more': ['highcharts']
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
		'highcharts.more'
	], function ($, App) {
		$(function () {
			var app = new App();
			app.start();
		});
	});
});
