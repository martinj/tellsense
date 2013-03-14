/**
 * Used to prevent circular dependencies with highchart modules
 */
define([
	'_highcharts',
	'highcharts.more'
], function (HighCharts) {
	return HighCharts;
});