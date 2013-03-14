require({
	paths: {
		'text': '../vendor/require/text',
		'_jquery': '../vendor/jquery.min',
		'jquery.tmpl': '../vendor/jquery.tmpl.min',
		'backbone': '../vendor/backbone-min',
		'underscore': '../vendor/underscore-min',
		'_highcharts': '../vendor/highcharts/highcharts',
		'highcharts.more': '../vendor/highcharts/highcharts-more'
	},

	shim: {
		'_jquery': { exports: '$' },
		'jquery.tmpl': ['_jquery'],
		'backbone': {
			deps: ['underscore', '_jquery'],
			exports: 'Backbone'
		},
		'underscore': { exports: '_' },
		'_highcharts': { exports: 'HighCharts' },
		'highcharts.more': ['_highcharts']
	}
},
[
	'require'
],
function (require) {
	require(['jquery', 'app'], function ($, App) {
		$(function () {
			var app = new App();
			app.start();
		});
	});
});
