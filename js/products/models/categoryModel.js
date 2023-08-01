/* jshint undef: true, unused: true */
/* global define: false */
define(['backbone'], function(){
	"use strict";

	var CategoryModel = Backbone.Model.extend({
		defaults: {
			name: '',
			oneRow: false,
			addCodePath: false,
			imagesPath:	'',
			items: [],
			isVisible: true,
			loaded: false
		}
	});

	return CategoryModel;
});