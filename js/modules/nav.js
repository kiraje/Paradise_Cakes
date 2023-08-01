/* jshint undef: true, unused: true */
/* global define: false */
define(['jquery', 'underscore', 'velocity'], function($, _){
	"use strict";
	
	var Nav = {

		init: function () {
			// Clone navs
			this.cloneNavs();

			// Bind page navs
			this.scrollTo($('.menu-item'));

			// Bind mobile menu
			$('.js-mb-nav').click(function(e) {
				e.stopPropagation();
				Nav.mobile.on();
			});
			$('body').click(function() {
				if (Nav.mobile.isOpen) {
					Nav.mobile.off();
				}
			});
			$(window).resize(_.debounce(function(){
				if (Nav.mobile.isOpen && $('window').outerWidth() > 990) {
					Nav.mobile.off();
				}
			},500));
		},

		cloneNavs: function () {
			$('.menu-list').clone().addClass('menu-mobile').appendTo('.js-mb-menu');
		},

		mobile: {
			isOpen: false,

			on: function () {
				Nav.mobile.isOpen = true;
				Nav.mobile.goTO('0', '-100%');
			},
			off: function () {
				Nav.mobile.isOpen = false;
				Nav.mobile.goTO('-100%', '0');
			},
			goTO: function (to, from) {
				var menu = $('.js-mb-menu');

				if (Nav.mobile.isOpen) {
					menu.css('visibility', 'visible');
				}

				menu.velocity({
					translateY: [to, from]
				}, 500, 'ease', function () {
					if (!Nav.mobile.isOpen) {
						menu.css('visibility', 'hidden');
					}
				});
			}
		},

		scrollTo: function (nav) {
			nav.each(function() {
				$(this).on('click tap', function(e) {
					e.preventDefault();
					e.stopPropagation();
					
					var target = $(this).find('a').attr('href');

					var distance = $(target).offset().top;

					$('html, body').stop().animate({
					    'scrollTop': distance
					}, 900, 'swing');

					if (Nav.mobile.isOpen) {
						Nav.mobile.off();
					}
				});
			});
		}
	};

	Nav.init();
});