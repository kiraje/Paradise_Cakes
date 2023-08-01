/* jshint undef: true, unused: true */
/* global define: false */
define(['backbone', 'velocity', 'waitImg'], function(Backbone){
	"use strict";

	var ItemView = Backbone.View.extend({
		tagName: 'div',
		className: 'details-container',

		template: _.template([
			'<div class="container">',
				'<div class="close-btn"></div>',
				'<div class="row">',
					'<div class="column">',
						'<div class="product-gallery">',
							'<% _.each(gallery, function(item){ %>',
								'<img src="<%= path %><%= item %>" alt="">',
							'<% }) %>',
						'</div>',
					'</div>',
				'</div>',
				'<div class="row">',
					'<div class="column">',
						'<div class="product-info-container">',
							'<h3 class="product-info"><%= details %></h3>',
						'</div>',
					'</div>',
				'</div>',
			'</div>',
		].join('')),

		initialize: function () {
			var that = this;
			
			var templateData = _.extend(that.model.toJSON(), { cid: that.model.cid });
			that.$el.append(that.template(templateData));
		},

		render: function () {
			return this;
		}
	});

	return ItemView;
});