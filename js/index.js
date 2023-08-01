requirejs.config({
    waitSeconds: 0,
    paths: {
        'jquery': 'lib/jquery-2.1.3.min',
        'placeholder': 'lib/jquery.placeholder',
        'owl': 'lib/owl.carousel.min',
        'smoothScroll': 'lib/smoothScroll',
        'bowser': 'lib/bowser.min',
        'underscore': 'lib/underscore-min',
        'backbone': 'lib/backbone-min',
        'waitImg': 'lib/jquery.waitforimages.min',
        'scroll': 'lib/jquery.mCustomScrollbar.concat.min',
        'velocity': 'lib/velocity.min',
        'velocityUi': 'lib/velocity.ui',
        'bpopup': 'lib/jquery.bpopup.min',
        'validate': 'lib/jquery.validate.min',
        'form': 'lib/jquery.form.min',
        'domReady': 'lib/domReady',
        'inview': 'lib/inview',
        'fastclick': 'lib/fastclick'
    },

    shim: {
        'underscore': ['jquery'],
        'backbone': ['underscore'],

        'placeholder': ['jquery'],
        'owl': ['jquery'],
        'smoothScroll': ['jquery'],
        'bowser': ['jquery'],
        'validate': ['jquery'],
        'form': ['jquery'],
        'waitImg': ['jquery'],
        'velocity': ['jquery'],
        'velocityUi': {
            deps: [
                'jquery',
                'velocity'
            ]
        },
        'scroll': ['jquery'],
        'bpopup': ['jquery'],
        'inview': ['jquery'],
        'fastclick': ['jquery']
    }
});


require([
    'smoothScroll', 
    'modules/general', 
    'modules/sliders',
    'modules/nav',
    'modules/form',
    'products/products',
    'modules/cover',
    'modules/map',
    'modules/preloader',
]);