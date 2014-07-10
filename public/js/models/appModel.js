// Filename: appModel.js
define(
	[
		'backbone'
	],
	function(Backbone){
		var AppModel = Backbone.Model.extend({
			defaults: {
				screen : 'welcome',
				images: []
			}
		})
		return AppModel;
	}
);