/* jshint undef: true, unused: true */
/* global define: false */
define(['jquery', 'inview', 'velocity', 'velocityUi'], function($){
	"use strict";

	var s = {
		services: {
			el: $('.boxes-block'),
			call: 'toTop',
			wait: 150
		},
		title: {
			el: $('.section-title-container'),
			child: $('.section-title, .section-subtitle'),
			call: 'toTop',
			wait: 150
		},
		prod: {
			el: $('.js-products-slider'),
			child: $('.product-item'),
			call: 'toTop',
			wait: 150
		},
		team: {
			el: $('.team-member-block'),
			child: $('.member-photo, .member-name, .member-info'),
			call: 'toTop',
			wait: 500
		},
		skills: {
			el: $('.statistic-diagramma'),
			call: 'skills'
		},
		who: {
			el: $('.who-we-are-wrapper .gray-text-block'),
			call: 'toTop',
			wait: 150
		},
		offers: {
			el: $('.offers-wrapper .gray-text-block'),
			call: 'toTop',
			wait: 150
		},
		testim: {
			el: $('.testimonials-slider-block'),
			call: 'toTop',
			wait: 150
		},
		contact: {
			el: $('.contact-block'),
			call: 'toTop',
			wait: 150
		},
		form: {
			el: $('.contact-form-block'),
			child: $('.form-elem, .submit-container'),
			call: 'toTop',
			wait: 150
		},
		quote: {
			el: $('.quotes-block'),
			call: 'toTop'
		}
	}
	
	var Reveal = {

		hideElements: function () {			
			if ($(window).width() < 1025) {
				$('html').addClass('low-device');
			} else {
				// Prepare for reveal
				$.each(s, function() {
					var that = this,
						target = Reveal.checkForChild(that);

					if (typeof that.child !== 'undefined') {
						$(that.el).find(target).css('opacity', '0');						
					} else {
						target.css('opacity', '0');
					}
				}); 
			}			
		},

		init: function () {
			if ($(window).width() > 1024) {
				$.each(s, function() {
					var that = this,
						target = Reveal.checkForChild(that);

					if (typeof that.child !== 'undefined') {
						that.el.each(function() {
							var comp = this;
							$(comp).one('inview', function() {
								Reveal[that.call]($(comp).find(target), that.wait);
							}); });
					} else {
						that.el.one('inview', function() {
							Reveal[that.call](target, that.wait);
						});
					}
				});
			} else {
				$('.statistic-diagramma').one('inview', function() {
					Reveal['skills']($('.statistic-diagramma'));
				});
			}

		},

		checkForChild: function (that, scope) {
			if (typeof that.child !== 'undefined') {
				return that.child;
			} else {
				return that.el;
			}
		},

		toTop: function (el, wait) {
			el.velocity('transition.slideUpIn', {
				duration: 1000,
				stagger: wait
			});
		},

		skills: function (el) {
			el.css('opacity', '1').each(function() {
				$(this).velocity({
					width: $(this).data('width')
				}, 1000, 'ease');
			});
		}
	};

	Reveal.hideElements();

	return Reveal;
});