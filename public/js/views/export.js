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
				this.first = true;
				//window.app.model.bind('change:screen', _.bind(this.flicker,this));
			},
			back: function(){
				window.app.model.set('screen', 'select')
			},
			flicker: function(){
				if(window.app.model.get('screen') == 'export'){
					this.first = !this.first;
					//console.log(this.first)
					//_.delay(this.flicker,1000)
				}
			}	
		});
		return Export;
	}
);