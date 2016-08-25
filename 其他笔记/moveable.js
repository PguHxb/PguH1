$.fn.moveable = function(options) {
				this.each(function(){
					var _default = {
					handler: undefined
				}
				$.extend(_default,options);
				var self = $(this);
				var point, inMove = false;
				var mousedown=function(event) {
					self.height(self.height());
					self.width(self.width());
					inMove = true;
					point = {
						x: event.pageX,
						y: event.pageY
					};
					self.offset(self.offset());
				};
				if(_default.handler == undefined){
					self.mousedown(mousedown)
				}else{
					self.on('mousedown',_default.handler,mousedown)
				}
				
				$(window).mousemove(function(event) {
					
					if(inMove) {
						event.preventDefault();
						if(event.pageX < 0 || event.pageY < 0 || event.clientX > $(window).width() || event.clientY > $(window).height()) return;
						//console.log(event.pageX < 0 || event.pageY < 0 || event.clientX > $(window).width() || event.clientY > $(window).height())
						self.css({
							top: "+=" + (event.pageY - point.y) + 'px',
							left: "+=" + (event.pageX - point.x) + 'px'
						})
						point = {
							x: event.pageX,
							y: event.pageY
						};
					}

				}).mouseup(function() {
					inMove = false;
				})
				})
				return this;
			}