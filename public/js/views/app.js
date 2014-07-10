// Filename: app.js
define(
	[
		'jquery',
		'underscore',
		'backbone',
		'models/appModel'
	],
	function($, _, Backbone, AppModel){
		var App = Backbone.View.extend({
			el: 'body',
			model: new AppModel(),
			initialize: function(){
				this.model.bind('change:screen', _.bind(this.navigate,this))
			},
			navigate: function(model){
				this.$('#innerContainer').attr('class' , 'navi-'+model.get('screen'));
			}
		});
		return App;
	}
);