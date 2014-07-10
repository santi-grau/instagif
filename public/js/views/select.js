// Filename: select.js
define(
	[
		'jquery',
		'underscore',
		'backbone'
	],
	function($, _, Backbone){
		var Select = Backbone.View.extend({
			el: '#select',
			events: {
				'change .imgUpload' : 'readUrl'
			},
			initialize: function(){
				window.app.model.bind('change:images', this.setImage);
			},
			readUrl: function(input){
				var imfile = $(input.currentTarget).parents('.imfile');
				var index = $('.imgUpload').index( $(input.currentTarget) );
				if (input.target.files && input.target.files[0]) {
					var reader = new FileReader();
					reader.onload = function (e) {
						var images = _.clone(window.app.model.get('images'));
						images[index] = e.target.result;
						window.app.model.set('images',images)
					}
					reader.readAsDataURL(input.target.files[0]);
				}
			},
			setImage: function(model){
				_.each(model.get('images'), function(e,i,l){
					this.$('.imfile:eq('+i+')').css('background-image',  'url('+e+')').addClass('hasimage');
					if(l.length == 2) setTimeout(function(){window.app.model.set('screen', 'export')}, 500);
				})
			}
		});
		return Select;
	}
);