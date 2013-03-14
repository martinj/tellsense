/**
 * Used to prevent circular dependencies with jquery modules
 */
define([
	'_jquery',
	'jquery.tmpl'
], function ($) {
	return $;
});