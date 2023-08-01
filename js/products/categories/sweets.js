/* jshint undef: true, unused: true */
/* global define: false */
define([], function(){
	return {
		name: "Sweets",
		oneRow: true,
		imagesPath: "images/sweets/",
		addCodePath: false,
		items: [
			{
				name: "Turkish sweets",
				price: {
					current: "10",
					old: "5"
				},
				code: "N8301",
				details: "This is part cookie, part brownie, and wholly delicious.",
				thumb: "prod1.jpg",
				gallery: ["prod1-1.jpg", "prod1-1.jpg"]
			},
			{
				name: "Macaroons",
				price: {
					current: "95"
				},
				code: "N8303",
				details: "A macaroon is a type of small circular cake, typically made from ground almonds or coconut, with sugar and egg white.",
				thumb: "prod2.jpg",
				gallery: ["prod2-1.jpg", "prod2-1.jpg"],
				label: {
					icon: 'fa-money',
					text: '50% off'
				}
			},
			{
				name: "Chocolate heart",
				price: {
					current: "15"
				},
				code: "N8302",
				details: "These buttery, lightly sweet almond cookies take a beautiful shape in the waffle iron.",
				thumb: "prod3.jpg",
				gallery: ["prod3-1.jpg", "prod3-1.jpg"]
			},
			{
				name: "Candy set",
				price: {
					current: "29"
				},
				code: "N8304",
				details: "There's bad white chocolate and good white chocolate, and the good stuff, when treated right, is one of the most versatile and useful ingredients in the pastry kitchen",
				thumb: "prod4.jpg",
				gallery: ["prod4-1.jpg", "prod4-1.jpg"]
			}
			
		]
	};
});
