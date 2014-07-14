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
		var TwoContent = Backbone.View.extend({
			initialize: function(){
				this.$el.fadeTo(300,0.5)
			},
			update: function(){

			},
			resize: function(){
				
			}
		})
		var Welcome = Backbone.View.extend({
			el: '#welcome',
			events: {
				'click' : 'navigate'
			},
			initialize: function(){
				var two = new Two({ fullscreen: true, type: Two.Types['canvas'] }).appendTo(this.$el[0]);
				var content = new TwoContent({ el: two.renderer.domElement})


				this.$('#logoholder').append(Logo)
				var logo = two.interpret(document.getElementById("Layer_1"));
				_.each(logo.children, function(child) {
					_.each(child.vertices, function(v) {
						v.ox = v.x;
						v.oy = v.y;
					});
				});
				two.bind('update', function() {
					_.each(logo.children, function(child) {
						_.each(child.vertices, function(v) {
							var x = v.ox + Math.random();
							var y = v.oy + Math.random();
						v.set(x, y);
						});
					});
				}).play();
				var resize = function() {
					var cx = two.width / 2;
					var cy = two.height / 2;
					var rect = logo.getBoundingClientRect();
					logo.translation.set(cx - rect.width / 2, cy - rect.height / 2);
				};
				two.bind('resize', resize);
				resize();
			},
			navigate: function(){
				window.app.model.set('screen', 'select')
			}
		});
		return Welcome;
	}
);