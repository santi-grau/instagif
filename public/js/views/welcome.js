// Filename: welcome.js
define(
	[
		'jquery',
		'underscore',
		'backbone',
		'two',
		'tween',
		'text!assets/logo.svg'
	],
	function($, _, Backbone, Two, Tween, Logo){
		var TwoSquare = Backbone.View.extend({
			initialize: function(data){
				_.bindAll(this,'blink');
				this.two = data.Two;
				this.blinking = false;
				this.vertices();
				this.two.bind('resize', this.resize, this);
				this.resize();
			},
			vertices: function(){
				this.square = this.two.makeRectangle(this.two.width/2, this.two.height/2, this.two.width, this.two.height);
				this.square.fill = "#FFF";
				this.square.noStroke();
			},
			update: function(){
				
			},
			resize: function(){
				var cx = this.two.width / 2;
				var cy = this.two.height / 2;
				this.square.vertices[0].set(-cx,-cy);
				this.square.vertices[1].set(cx,-cy);
				this.square.vertices[2].set(cx,cy);
				this.square.vertices[3].set(-cx,cy);
				this.square.translation.set(cx , cy );
			},
			blink: function(){
				this.blinking = !this.blinking;
				if(this.blinking) this.square.fill = '#000';
				else this.square.fill = '#FFF';
			}
		});
		var TwoLogo = Backbone.View.extend({
			initialize: function(data){
				_.bindAll(this,'blink');
				this.two = data.Two;
				this.logo = data.logo;
				this.blinking = false;
				this.vertices();
				this.two.bind('update', this.update, this).play();
				this.two.bind('resize', this.resize, this);
				this.resize();
			},
			vertices: function(){
				_.each(this.logo.children, function(child) {
					_.each(child.vertices, function(v) {
						v.ox = v.x;
						v.oy = v.y;
					});
				});
			},
			update: function(){
				_.each(this.logo.children, function(child) {
					_.each(child.vertices, function(v) {
						var x = v.ox + Math.random();
						var y = v.oy + Math.random();
						v.set(x, y);
					});
				});
			},
			resize: function(){
				var cx = this.two.width / 2;
				var cy = this.two.height / 2;
				var rect = this.logo.getBoundingClientRect();
				this.logo.translation.set(cx - rect.width / 2, cy - rect.height / 2 - 10);
			},
			blink: function(){
				this.blinking = !this.blinking;
				if(this.blinking) this.logo.fill = '#FFF';
				else this.logo.fill = '#000';
			}
		});
		var TwoLoading = Backbone.View.extend({
			initialize: function(data){
				_.bindAll(this,'finished','blink')
				this.percent = 0;
				this.two = data.Two;
				this.logo = data.logo;
				this.blinking = false;
				this.line = this.makeLine();
				var self = this;
				this.tween = new TWEEN.Tween( { x: -40} ).to( { x: 40 }, 1200 ).easing( TWEEN.Easing.Elastic.Out )
				.onUpdate( function () {
					self.line.vertices[0].set(-40,0);
					self.line.vertices[1].set(this.x,0);
				}).start();
				this.tween.stop;
				this.lineInner = this.makeLineInner();
				this.two.bind('update', this.update, this);
				this.two.bind('resize', this.resize, this);
				this.resize();
				this.animate();
			},
			animate: function(time){
				TWEEN.update(time||0);
				requestAnimationFrame( _.bind(this.animate,this) );
			},
			makeLine: function(){
				var line = this.two.makeLine(0,0, 80,0);
				line.linewidth = 8;
				line.cap = 'round';
				return line;
			},
			makeLineInner: function(){
				var lineInner = this.two.makeLine(0,0, 0,0);
				lineInner.stroke = '#FFF';
				lineInner.linewidth = 4;
				lineInner.cap = 'round';
				return lineInner;
			},
			update: function(f){
				this.percent += 0.01;
				var p = this.percent;
				if(p < 1){
					this.lineInner.vertices[0].set(-40,0);
					this.lineInner.vertices[1].set(-40 + 80*p,0);
				}else{
					this.two.remove(this.lineInner);
					this.two.remove(this.line);
					_.delay(this.finished,500);
				}
			},
			finished: function(){
				//this.trigger('finished');
				//this.two.pause();
			},
			resize: function(){
				var cx = this.two.width / 2;
				var cy = this.two.height / 2;
				var logo = this.logo.getBoundingClientRect();
				var line = this.line.getBoundingClientRect();
				var lineInner = this.lineInner.getBoundingClientRect();
				this.line.translation.set(cx, cy - line.height / 2 + logo.height / 2 + 20);
				this.lineInner.translation.set(cx, cy - lineInner.height / 2 + logo.height / 2 + 20 - 2);
			},
			blink: function(){
				this.blinking = !this.blinking;
				if(this.blinking) this.line.stroke = '#FFF';
				else this.line.stroke = '#000';
				if(this.blinking) this.lineInner.stroke = '#000';
				else this.lineInner.stroke = '#FFF';
			}
		});
		var Welcome = Backbone.View.extend({
			el: '#welcome',
			events: {
				'click' : 'blink'
			},
			initialize: function(){
				_.bindAll(this,'blink')
				this.blinking = false;
				this.blinkstart = null;
				this.blinkend = null;
				this.two = new Two({ fullscreen: true, type: Two.Types['canvas'] }).appendTo(this.$el[0]);
				this.$('#logoholder').append(Logo);
				var logo = this.two.interpret(document.getElementById("Layer_1"));
				this.twoSquare = new TwoSquare({ el: this.two.renderer.domElement, Two: this.two});
				this.twoLoading = new TwoLoading({ el: this.two.renderer.domElement, Two: this.two, logo: logo});
				this.twoLogo = new TwoLogo({ el: this.two.renderer.domElement, Two: this.two, logo: logo});
				this.background = this.two.makeGroup();
				this.foreground = this.two.makeGroup();
				console.log(this.twoLogo)
				this.background.add(this.twoSquare.square);
				this.foreground.add(this.twoLogo.logo,this.twoLoading.line,this.twoLoading.lineInner);
				this.twoLoading.on('finished', this.navigate)
			},
			navigate: function(){
				window.app.model.set('screen', 'select');
			},
			blink: function(time){
				if(!this.blinking) {
					this.blinking = true;
				}else{
					if(!this.blinkstart) {
						this.blinkstart = time;
						this.blinkend = time + Math.random()*200 + 100;
					}
					if(time < this.blinkend){
						this.twoLogo.blink();
						this.twoLoading.blink();
						this.twoSquare.blink();
					}else{
						this.twoLogo.blinking = true;
						this.twoLoading.blinking = true;
						this.twoSquare.blinking = true;
						this.twoLogo.blink();
						this.twoLoading.blink();
						this.twoSquare.blink();
						this.blinking = false;
						this.blinkstart = null;
						this.blinkend = null;
					}
				}
				if(this.blinking) requestAnimationFrame( _.bind(this.blink,this) );
			}
		});
		return Welcome;
	}
);