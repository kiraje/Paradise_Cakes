/* jshint undef: true, unused: true */
/* global define: false */
define(['backbone'], function() {
	'use strict';

	var ProductView = Backbone.View.extend({
		tagName: 'ul',
		className: 'prod-menu',

		template: _.template([
			'<li class="prod-menu-item js-category-item" data-target="<%= cid %>">',
				'<span class="category-name"><%= name %></span>',
			'</li>',
		].join('')),

		initialize: function() {
			var that = this;

			that.collection.forEach(function (model) {
				var templateData = _.extend(model.toJSON(), { cid: model.cid });
				that.$el.append(that.template(templateData));
			});

			$('.js-category-item', that.$el).click(function() {
				$(window).trigger('loadNewCategory', $(this).data('target'));

				$('.js-category-item').removeClass('active');
				$(this).addClass('active');
			});

			$('.currency', that.$el).html($('body').data('currency'));
		},

		render: function() {
			return this;
		}
	});

	return ProductView;
});