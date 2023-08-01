/* jshint undef: true, unused: true */
/* global define: false */
define(['backbone'], function(Backbone){
	"use strict";

	var ItemView = Backbone.View.extend({
		tagName: 'div',
		className: 'product-item',

		template: _.template([
			'<div class="image-block">',
				'<div class="prod-loader js-det-loader">',
					'<div class="loader">',
						'<span class="circle"></span>',
					   	'<span class="circle"></span>',
						'<span class="circle"></span>',
					'</div>',
				'</div>',

				'<img src="<%= path %><%= thumb %>" alt="">',

				'<% if (label.text !== "") { %>',
				'<span class="best-seller-block">',
					'<span class="label-icon"><span class="label-fig"></span><i class="fa <% if (_.isEmpty(label.icon)){ %>fa-bomb<%} else {%><%= label.icon %><%}%>"></i></span>',
					'<span class="label-text"><%= label.text %></span>',
				'</span>',
				'<% } %>',

				'<div class="prod-hover-effect">',
					'<span class="add-to-cart hover-elem" data-target="<%= cid %>">+</span>',
					'<span class="view-details hover-elem js-view-product" data-icon="&#xe087;" data-target="<%= cid %>"></span>',
				'</div>',
			'</div>',

			'<div class="description-block">',
				'<p class="prod-name"><%= name %></p>',
				'<p class="prod-price <% if (price.old) {%>new-price<%}%>">',
					'<span class="currency"></span>',
					'<span class="value"><%= price.current %></span>',
					'<% if (price.old) { %>',
						'<span class="old-price">',
							'<span class="currency"></span>',
							'<span class="value"><%= price.old %></span>',
						'</span>',
					'<%}%>',
				'</p>',
			'</div>',
			
		].join('')),

		initialize: function () {
			var that = this;
			
			var templateData = _.extend(that.model.toJSON(), { cid: that.model.cid });
			that.$el.append(that.template(templateData));

			// Bind controls
			$('.js-view-product', that.$el).click(function () {

				// Show preloader
                $('.js-det-loader', that.$el).velocity('transition.fadeIn');

				$(window).trigger('showProductItem', $(this).data('target'));
			});

			// Bind add to cart
			$('.add-to-cart', that.$el).click(function () {
				$(window).trigger('addToCart', $(this).data('target'));

				var plusOne = $('<div class="plusOne">+1</div>');
				plusOne.appendTo($(this));
				setTimeout(function() {
					$(plusOne, $(this)).remove();
				}, 1000);
			});

			$('.currency', that.$el).html($('body').data('currency'));
		},

		render: function () {
			return this;
		}
	});

	return ItemView;
});