define(function (require) {
	var $ = require('jquery'),
		Backbone = require('backbone'),
		template = $.template(null, require('text!templates/topmenu.html'));

	/**
	 * Creates a new instance of this view class.
	 * @constructor
	 */
	return Backbone.View.extend({
		className: 'navbar navbar-inverse navbar-fixed-top',

		/**
		 * Will be called when creating the instance.
		 */
		initialize: function (options) {
			this.listenTo(options.router, 'route', this.updateActiveMenu);
		},

		/**
		 * Render the HTML for this view
		 */
		render: function () {
			this.$el.html($.tmpl(template, {}));
			return this;
		},

		/**
		 * Toggle the active menu item
		 * @param {String} routeName
		 */
		updateActiveMenu: function (routeName) {
			this.$('ul.nav > li').removeClass('active');
			this.$('ul.nav > li.' + routeName).addClass('active');
		}
	});
});