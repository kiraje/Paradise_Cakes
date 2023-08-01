/* jshint undef: true, unused: true */
/* global define: false */
define(['jquery', 'domReady', 'modules/cover', 'modules/reveal', 'velocity'], function($, domReady, Cover, Reveal) {
    "use strict";

    var PL = {

        init: function() {
            $('.page-content').css('opacity', '1');
            domReady(function() {
                PL.hide();
            });
        },

        hide: function() {
            $('.page-preloader').velocity({
                translateY: ['-100%', '0']
            }, 500, 'ease', function () {
                Reveal.init();
                Cover.init();
            });
        }
    };

    PL.init();
});
