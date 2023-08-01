/* jshint undef: true, unused: true */
/* global define: false */
define(['jquery', 'underscore', 'domReady'], function($, _, domReady){
	"use strict";
	
	var Cover = {

		init: function () {
			this.fill();

			$(window).resize(_.debounce(function(){
				Cover.fill();
			},500));
		},

		fill: function () {
			$('.cover-el').each(function() {
				$(this).removeClass('absolute');
				
				var elH = $(this).outerHeight(),
					wH  = $(window).outerHeight();

				if (elH < wH) {
					$(this).addClass('absolute');
				}
			});
		}
	};

	return Cover;
});