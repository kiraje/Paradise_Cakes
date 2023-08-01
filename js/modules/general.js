/* jshint undef: true, unused: true */
/* global define: false */
define(['jquery', 'bowser', 'underscore', 'fastclick', 'placeholder'], function($, bowser, _, FastClick){
	"use strict";

	var General = {

		init: function () {
			// Eliminate the 300ms delay between a physical tap and the firing of a click event on mobile browsers
			FastClick.attach(document.body);

			// Fix ie 9- placeholder
			$('input, textarea').placeholder();

			this.fixBackground();
			$(window).resize(_.debounce(function(){
				General.fixBackground();
			},500));
		},

		fixBackground: function () {
			$('html').removeClass('low-device no-parallax');

			if ($(window).width() < 1025) {
				$('html').addClass('low-device');
			}

			if (bowser.msie || bowser.firefox) {
				$('html').addClass('no-parallax');
			}

			if (bowser.msie) {
				$('*').css('background-attachment', 'scroll');
			}

			if (bowser.firefox || bowser.msie) {
				$('html').addClass('no-video-pl');
			}
		}
	};

	General.init();
});