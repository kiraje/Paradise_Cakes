/* jshint undef: true, unused: true */
/* global define: false */
define(['jquery', 'validate'], function($) {
    "use strict";

    var Form = {

        init: function() {
            this.validateForm();
        },

        validateForm: function() {
            var $form = $(".message-form");
            $form.validate({
                submitHandler: function(form) {
                    $(form).ajaxSubmit().resetForm();
                    Form.activeState($('.js-submit-btn'), 'succes');
                },
                invalidHandler: function() {
                    Form.activeState($('.js-submit-btn'), 'error');
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
    };

    Form.init();
});
