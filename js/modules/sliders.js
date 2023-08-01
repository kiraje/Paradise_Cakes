/* jshint undef: true, unused: true */
/* global define: false */
define(['jquery', 'owl'], function($){
	"use strict";

	var s = {
		main: {
			owl: $('.main-image-slide'),
			settings: {
				loop:true,
				margin:0,
				nav:true,
				items: 1,
				navText: ["",""],
				dots: true,
				smartSpeed: 700,
				navContainer: '.controls-block'
			}
		},
		text: {
			owl: $('.text-full-width-slide'),
			settings: {
		        loop:false,
		        margin:0,
		        nav:true,
		        items: 1,
		        navText: ["",""],
		        dots: false,
		        smartSpeed: 700,
		        navContainer: '.controls-block'
		    }
		},
		fullWidth: {
			owl: $('.main-full-width'),
			settings: {
		        loop:true,
		        margin:0,
		        nav:false,
		        items: 1,
		        smartSpeed: 700,
		        dots: true
		    }
		},
		testim: {
			owl: $('.testimonials-slider'),
			settings: {
		        loop: false,
		        margin: 0,
		        nav: false,
		        items: 1,
		        dots: true,
		        smartSpeed: 700
		    }
		}
	};

	var Owl = {

		init: function () {
			$.each(s, function() {
				if (this.owl.length) {
					this.owl.owlCarousel(this.settings);
				}
			});
		}
	};

	Owl.init();
});	