// Filename: main.js
'use strict';
require.config({
	shim: {
		jqueryui: {
			deps: [
				'jquery'
			],
			exports: '$'
		},
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		two: {
			deps: [
				'underscore',
				'backbone'
			],
			exports: 'Two'
		}
	},
	paths: {
		jquery: 'lib/jquery',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone',
		two: 'lib/two',
		text: 'lib/text'
	}
});
require([ 'views/app', 'views/welcome', 'views/select', 'views/export'],
	function(App, Welcome, Select, Export){
		window.app = new App();
		window.welcome = new Welcome();
		window.select = new Select();
		window.export = new Export();
	}
);