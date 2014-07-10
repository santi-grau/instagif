// Filename: export.js
define(
	[
		'jquery',
		'underscore',
		'backbone'
	],
	function($, _, Backbone){
		var Export = Backbone.View.extend({
			el: '#export',
			events: {
				'click #backbut' : 'back'
			},
			initialize: function(){
				this.count = 0;
				this.interval = null;
				window.app.model.bind('change:screen', _.bind(this.flicker,this));
			},
			back: function(){
				window.app.model.set('screen', 'select')
			},
			flicker: function(){
				if(window.app.model.get('screen') == 'export'){
					this.interval = setInterval(_.bind(this.swap, this), 100)
				}else{
					clearInterval(this.interval)
				}
			},
			swap: function(){
				if(this.count < window.app.model.get('images').length-1) this.count += 1;
				else this.count = 0;
				this.$('#preview').css('background-image',  'url('+window.app.model.get('images')[this.count]+')');
			}
		});
		return Export;
	}
);