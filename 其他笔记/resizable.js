$.fn.resizable = function(options) {
	
		this.each(function(){
			var self = $(this),
			directions = {};
		var _default = {
			handerWidth: 3,
			minWidth: undefined,
			minHeight: undefined,
			maxHeight: undefined,
			maxWidth: undefined
		};

		$.extend(_default, options);
		var priveteMethods = {
 
			initStyle: function() {
				if(_default.minWidth != undefined) {

					self.css('minWidth', _default.minWidth);
				}
				if(_default.minHeight != undefined) {
					self.css('minHeight', _default.minHeight);
				}
				if(_default.maxHeight != undefined) {

					self.css('maxHeight', _default.maxHeight);
				}
				if(_default.maxWidth != undefined) {
					self.css('maxWidth', _default.maxWidth);
				}
				self.offset(self.offset())
			},
			initHtml: function() {
				var dic = [{
					d: "w",
					s: {
						top: 0,
						bottom: 0,
						left: -_default.handerWidth,
						width: _default.handerWidth,
						cursor: "w-resize",
						"z-index": 999
					}
				}, {
					d: "e",
					s: {
						top: 0,
						bottom: 0,
						right: -_default.handerWidth,
						width: _default.handerWidth,
						cursor: "e-resize"
					}
				}, {
					d: "s",
					s: {
						bottom: -_default.handerWidth,
						height: _default.handerWidth,
						left: 0,
						right: 0,
						cursor: "s-resize"
					}
				}, {
					d: "n",
					s: {
						top: -_default.handerWidth,
						height: _default.handerWidth,
						left: 0,
						right: 0,
						cursor: "n-resize"
					}
				}, {
					d: "se",
					s: {
						height: _default.handerWidth,
						width: _default.handerWidth,
						bottom: -_default.handerWidth,
						right: -_default.handerWidth,
						cursor: "se-resize"
					}
				}, {
					d: "sw",
					s: {
						height: _default.handerWidth,
						width: _default.handerWidth,
						bottom: -_default.handerWidth,
						left: -_default.handerWidth,
						cursor: "sw-resize"
					}
				}, {
					d: "ne",
					s: {
						height: _default.handerWidth,
						width: _default.handerWidth,
						top: -_default.handerWidth,
						right: -_default.handerWidth,
						cursor: "ne-resize"
					}
				}, {
					d: "nw",
					s: {
						height: _default.handerWidth,
						width: _default.handerWidth,
						top: -_default.handerWidth,
						left: -_default.handerWidth,
						cursor: "nw-resize"
					}
				}];
				var container = $('<div class="resize-controller"></div>').appendTo(self)
				for(var i in dic) {

					directions[dic[i].d] = $('<div style="position: absolute;" class="resize-' + dic[i].d + '" data-direction="' + dic[i].d + '"></div>').css(dic[i].s);
				}
				for(var i in directions) {
					directions[i].appendTo(container);
				}
			}
		}

		priveteMethods.initStyle();
		priveteMethods.initHtml();
		var resizeTarget = undefined;
		var point;

		directions["e"].add(directions["w"]).add(directions["n"]).add(directions["s"]).add(directions["ne"]).add(directions["nw"]).add(directions["se"]).add(directions["sw"]).mousedown(function(event) {
			event.preventDefault();
			event.stopPropagation();
			point = {
				x: event.pageX,
				y: event.pageY
			};
			resizeTarget = $(this).data('direction');

			$('html').css('cursor', $(this).css('cursor'))
		})
		$(window).mouseup(function() {
			resizeTarget = undefined;
			$('html').css('cursor', 'auto');
		}).mousemove(function(event) {
		
			if(resizeTarget) {
				if(event.pageX<0||event.pageY<0||event.clientX>$(window).width()||event.clientY>$(window).height())return ;
				var diffx = (point.x - event.pageX);
				var diffy=(point.y-event.pageY);
				if(/e/.test(resizeTarget)) {
					
					if(
						(isNaN(parseInt(self.css('min-width'))  )? true : self.width() - diffx > parseInt(self.css('min-width'))) &&
						(isNaN(parseInt(self.css('max-width'))) ? true : self.width() - diffx < parseInt(self.css('max-width')))
					) {
						
						self.css({
							width: "-=" + diffx + "px"
						})
						point.x = event.pageX;
					}
				} 
				if(/w/.test(resizeTarget)) {
					if(
						(isNaN(parseInt(self.css('min-width')) ) ? true : (self.width() + diffx) > parseInt(self.css('min-width'))) &&
						(isNaN(parseInt(self.css('max-width')) ) ? true : (self.width() + diffx) < parseInt(self.css('max-width')))
					) {
						self.css({
							left: "-=" + diffx + "px",
							width: "+=" + diffx + "px",
						})
						point.x = event.pageX;
					}
				}
				if(/n/.test(resizeTarget)) {
					
					if(
						
						(isNaN(parseInt(self.css('min-height')) ) ? true : self.height() + diffy > parseInt(self.css('min-height'))) &&
						(isNaN(parseInt(self.css('max-maxheihgt'))) ? true : self.height() + diffy < parseInt(self.css('max-height')))
					) {
						
						self.css(
							{
								"height":('+='+diffy+'px'),
								top: "-=" + diffy + "px",
								}
						);
						point.y= event.pageY;
						
					}
				}
				if(/s/.test(resizeTarget)){
					
					if(
						(isNaN(parseInt(self.css('max-height')) ) ? true : self.height() - diffy < parseInt(self.css('max-height'))) &&
						(isNaN((self.css('min-heihgt')) )? true : self.height() - diffy > parseInt(self.css('min-height')))
					){ 
					
						self.css(
							{
								"height":('-='+diffy+'px'),
								
								}
						);
						point.y =  event.pageY;
					}
				}

			}
		})
		});
	
				return this;
			

			}
