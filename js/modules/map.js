/* jshint undef: true, unused: true */
/* global define, google: false */
define(['jquery','modules/mapStyles', 'underscore', 'velocity'], function($, MapStyles, _){
	'use strict';

	var Map = {
		init: function() {
			this.createMap();

			$('.js-map-address').click(function () {
				$('.js-pin-btn').click();
			});

			$('.js-pin-btn').click(function() {
				if (!$('.changing-map').length) {
					var map = $('.js-map-wrapper'),
						fa = $(this);

					if (map.hasClass('active')) {
						Map.state.off(fa, map);
					} else {
						Map.state.on(fa, map);
					}
				}
			});
			
			// $(window).resize(_.debounce(function(){
			// 	Map.checkSizes();
			// },500));
		},

		checkSizes: function () {
			if ($(window).outerWidth() > 640) {
				$('.footer-wrapper').removeClass('map-opend');
				$('footer').css('height', 'auto');
				$('body, html').scrollTop($('body, html').outerHeight());
			}
		},

		state: {
			on: function (btn, map) {
				btn.addClass('active');
				map.addClass('changing-map');

				map.addClass('active').velocity('stop').velocity({
					scale: ['1', '0.95'],
					opacity: ['1', '0']
				}, 500, 'ease', function () {
					map.removeClass('changing-map');
				});

				if ($(window).outerWidth() < 641) {
					var fw = $('.footer-wrapper');
					fw.addClass('map-opend');
					$('footer').css('height', fw.outerHeight());
					$('body, html').scrollTop($('body, html').outerHeight());
				}
			},
			off: function (btn, map) {
				btn.removeClass('active');
				map.addClass('changing-map');

				map.velocity('stop').velocity({
					scale: ['1.05', '1'],
					opacity: ['0','1']
				}, 500, 'ease', function () {
					map.removeClass('active changing-map');
				});

				if ($(window).outerWidth() < 641) {
					var fw = $('.footer-wrapper');
					fw.removeClass('map-opend');
					$('footer').css('height', 'auto');
					$('body, html').scrollTop($('body, html').outerHeight());
				}
			}
		},

		createMap: function () {
			var	mapBlock = document.getElementById('map-block');
			var myLatlng = new google.maps.LatLng($(mapBlock).data('lon'), $(mapBlock).data('lat'));
			
			var	mapOptions = {
			      	zoom: 15,
					center: myLatlng,
			      	mapTypeId: google.maps.MapTypeId.ROADMAP,
			      	styles: MapStyles
				};

			var	map = new google.maps.Map(mapBlock, mapOptions);
			
			google.maps.event.addListenerOnce(map, 'idle', function(){
				$('.map-wrapper').hide();
			});

			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map
			});
		}
	};

	Map.init();
});