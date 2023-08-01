/* jshint undef: true, unused: true */
/* global define: false */
define(['jquery',
    'products/defineCategories',
    'products/collection/categoryCollection',
    'products/models/categoryModel',
    'products/views/categoryListView',
    'products/views/categorySliderView',
    'products/collection/itemsCollection',
    'products/collection/formCollection',
    'products/views/modalView',
    'products/models/formModel',
    'products/views/formView',
    'owl', 'waitImg', 'velocity', 'underscore', 'scroll', 'bpopup', 'validate', 'form'
], function($, CategoryItem,
    CategoryCollection, CategoryModel, CategoryListView,
    CategorySliderView, ItemsColelction, FormCollection, ModalView, FormModel, FormView
) {
    "use strict";

    var s = {
        categoryCollection: new CategoryCollection(),
        formCollection: new FormCollection(),
        curentCat: null,
        nextCat: null
    };

    var Products = {
        init: function() {
            // Create items collection
            window.ItemsCollection = new ItemsColelction();

            // Create category collection
            $.each(CategoryItem, function() {
                var item = new CategoryModel();
                item.set(this);
                s.categoryCollection.add(item);
            });

            // Create category list view
            var categoryListView = new CategoryListView({
                collection: s.categoryCollection
            });
            $('.js-category-list').html(categoryListView.render().el);

            // Load first category
            var item = s.categoryCollection.first();
            this.loadCategory(item, true);

            $(window).on('loadNewCategory', function(e, target) {
                e.preventDefault();
                Products.changeCategories.hide(s.categoryCollection.get({
                    cid: target
                }), target);
            });

            // Show product details
            this.showProductDetails();

            // Add to cart action
            $(window).on('addToCart', function(e, target) {
                e.preventDefault();
                var item = window.ItemsCollection.get({
                    cid: target
                });

                Products.addToCart.addToList(item.get('name'), item.get('price').current, item.get('code'), target);
            });
            $('.js-cart-btn').click(function() {
                Products.addToCart.showForm();
            });

            // Updata cart count
            s.formCollection.on({
                add: function() {
                    Products.cart.getLength(s.formCollection.length);
                    Products.cart.getTotal();
                },
                remove: function() {
                    Products.cart.getLength(s.formCollection.length);
                    Products.cart.getTotal();
                }
            });

            // Bind custom scroll
            $('.js-order-container').mCustomScrollbar();

            // Send preorder
            Products.validateForm();
            $('.js-preorder-btn').on('click', function(e) {
                // e.preventDefault();

                // Create products JSON
                $('#prCode_field').val('');
                var prodList = [];
                s.formCollection.forEach(function(model) {
                    prodList.push({
                        title: model.get('name'),
                        code: model.get('code')
                    });
                });
                if (prodList.length) {
                    $('#prCode_field').val(JSON.stringify(prodList));
                } else {
                    $('#prCode_field').val('');
                }
            });

            $('.currency').html($('body').data('currency'));
        },

        validateForm: function() {
            var $form = $(".preorder-form");
            $form.validate({
                submitHandler: function(form) {
                    $(form).ajaxSubmit().resetForm();
                    Products.orderSent();
                    Products.activeState($('.js-preorder-btn'), 'succes');
                },
                invalidHandler: function() {
                    Products.activeState($('.js-preorder-btn'), 'error');
                },
                errorPlacement: function() {},
                ignore: [],
                rules: {
                    // simple rule, converted to {required:true}
                    name: "required",
                    // compound rule
                    mail_field: {
                        required: true,
                        email: true
                    },
                    phone_field: {
                    	required: true,
                    	number: true
                    }
                }
            });
        },

        activeState: function (thisForm, state) {
            if (!thisForm.hasClass('active-state')) {
                thisForm.addClass('active-state');
                setTimeout(function() {
                    thisForm.addClass(state);
                    setTimeout(function() {
                        thisForm.removeClass(state);
                        setTimeout(function() {
                            thisForm.removeClass('active-state');
                        }, 250);
                    }, 700);
                }, 250);
            }
        },

        orderSent: function() {
        	// Reset collection
            s.formCollection.reset();
            Products.cart.getLength(0);
            Products.cart.getTotal();

            $('.js-order-list li').wrapAll('<div class="extra-wrapper"></div>');
            $('.extra-wrapper').velocity({
                scale: '0.8',
                opacity: '0'
            }, 500, function() {
                $('.extra-wrapper').remove();
            });
        },

        cart: {
            getLength: function(num) {
                $('.js-products-counter').html(num);

                if (!$('#products .products-number').hasClass('animated bounce')) {
                    $('#products .products-number').addClass('animated bounce');

                    setTimeout(function() {
                        $('#products .products-number').removeClass('animated bounce');
                    }, 1500);
                }
            },
            getTotal: function() {
                var total = 0;
                s.formCollection.forEach(function(model) {
                    total += parseFloat(model.get('price'));
                });
                $('.js-total-price .value').html(total);
            }
        },

        addToCart: {
            addToList: function(name, price, code, id) {
                var newItem = new FormModel({
                    name: name,
                    price: price,
                    parent: id,
                    code: code
                });
                s.formCollection.add(newItem);
            },
            showForm: function() {
                var form = new FormView({
                    collection: s.formCollection
                });
                $('.js-order-container .mCSB_container').append(form.render().el);
                $('.order-now-wrapper').bPopup({
                    closeClass: 'close-btn',
                    onClose: Products.addToCart.hideForm
                });
            },
            hideForm: function() {
                $('.js-order-list').remove();
            }
        },

        showProductDetails: function() {
            $(window).on('showProductItem', function(e, target) {
                e.preventDefault();
                var item = window.ItemsCollection.get({
                    cid: target
                });

                var modal = new ModalView({
                    model: item
                });
                $('.js-product-details').html('').append(modal.render().el);

                $('.product-gallery').waitForImages(function() {

                    // Show modal
                    $('.js-product-details').bPopup({
                        closeClass: 'close-btn',
                    }, function () {
                        // Hide preloader
                        $('.js-det-loader:visible').velocity('transition.fadeOut');                            
                    });

                    // Bind carousel
                    $('.product-gallery').owlCarousel({
                        loop: true,
                        dots: false,
                        nav: true,
                        navText: ['', ''],
                        items: 1
                    });
                });
            });
        },

        changeCategories: {
            hide: function(nextCat, cid) {
                if (!nextCat.get('loaded')) {
                    var height = $('.owl-item', s.curentCat).height() - parseInt($('.product-item').css('margin-bottom'));
                    $('.js-prod-loader').css('height', height + 5 + 'px').velocity('stop').velocity('transition.fadeIn');
                }

                Products.loadCategory(nextCat, false);
            },
            show: function(isNew) {
                s.curentCat.remove();
                s.nextCat.show();
                Products.initCategoryCarousel(s.nextCat);
                s.curentCat = s.nextCat;

                Products.checkNavNeed(s.curentCat);

                if (!isNew) {
                    s.curentCat.trigger('categoryChanged');
                }
            }
        },

        loadCategory: function(model, isFirst) {
            model.set({
                loaded: true
            });
            var categorySliderView = new CategorySliderView({
                    model: model
                }),
                doneView = categorySliderView.render().el;
            $('.js-products-container').prepend(doneView);

            var block = $('.js-products-container').find(doneView);
            block.css('display', 'none');

            if (isFirst) {
                s.curentCat = block;
                s.curentCat.css('display', 'block');
                Products.initCategoryCarousel(s.curentCat);

                $('.js-category-item').first().addClass('active');
            } else {

                s.nextCat = block;
                s.nextCat.waitForImages(function() {
                    if ($('.js-prod-loader:visible').length) {
                        $('.js-prod-loader').velocity('stop').velocity('transition.fadeOut', function () {
                            Products.changeCategories.show(true);
                        });
                    } else {
                        Products.changeCategories.show(true);
                    }

                });
            }
        },

        initCategoryCarousel: function(target) {
            var settings = {
                loop: true,
                margin: 10,
                responsiveClass: true,
                dots: true,
                navText: ["", ""],
                navContainer: '.prod-contronl-nav',
                dotsContainer: '.prod-controls-dots',
                responsive: {
                    0: {
                        items: 1,
                        nav: true,
                        dots: false
                    },
                    600: {
                        items: 3,
                        nav: true
                    },
                    1000: {
                        items: 4,
                        nav: true,
                        loop: false
                    }
                }
            };
            // resets
            $('.prod-contronl-nav, .prod-controls-dots').html('');

            $('.slides', target).on('initialized.owl.carousel resized.owl.carousel', function() {
                $('.prod-controls-dots').find('.owl-dot').each(function(index) {
                    $(this).find('span').html(index + 1);
                });

                var length = $('.prod-controls-dots .owl-dot', target.parent()).length;
                if (length < 2) {
                    $('.prod-controls-dots, .prod-contronl-nav').hide();
                } else {
                    $('.prod-controls-dots, .prod-contronl-nav').show();
                }
            }).owlCarousel(settings);

            target.on('categoryChanged', function() {
                 var owl = $('.slides', target);

                owl.data('owlCarousel').destroy();
                owl.removeClass('owl-carousel owl-loaded owl-text-select-on');
                owl.find('.owl-stage-outer').children().unwrap();
                owl.owlCarousel(settings);

                Products.checkNavNeed(target);
            });

            // Check nav need
            $(window).resize(_.debounce(function() {
                Products.checkNavNeed(target);
            }, 500));
        },

        checkNavNeed: function(target) {
            var stageOuter = $('.owl-stage-outer', target).width(),
                stage = $('.owl-stage', target).width();

            if (stage <= stageOuter) {
                target.addClass('no-nav');
            } else {
                target.removeClass('no-nav');
            }
        }
    };

    Products.init();
});
