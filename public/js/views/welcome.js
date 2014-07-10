// Filename: welcome.js
define(
	[
		'jquery',
		'underscore',
		'backbone',
		'two',
		'text!assets/logo.svg'
	],
	function($, _, Backbone, Two, Logo){
		var Welcome = Backbone.View.extend({
			el: '#welcome',
			events: {
				'click' : 'navigate'
			},
			initialize: function(){
				var two = new Two({ fullscreen: true, type: Two.Types['canvas'] }).appendTo(this.$el[0]);
				$('<div id="logoholder" />').appendTo(this.$el);
				this.$('#logoholder').append(Logo)
				var logo = two.interpret(document.getElementById("Layer_1")).center();
				this.$('#logoholder').remove();
				logo.translation.set(two.width / 2, two.height / 2);
				two.render();
			},
			navigate: function(){
				window.app.model.set('screen', 'select')
			}
		});
		return Welcome;
	}
);