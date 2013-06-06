if('undefined' === typeof jQuery) {	
	console.warn('!! landmark.js -> jQuery dependency is missing');
}
else {
	;(function ($, win, doc) {
		$.fn.landmark = function (opts) {
			var settings = $.extend({ 'id' : 'landmarkjs' }, opts),
				isDrawn = false,
				anchors = [], 
				$el;
			
			if(opts) {
				if('undefined' === typeof opts.id && document.getElementById(settings.id)) {
					console.error("!! landmark.js -> was already rendered on this object");
					return false;
				}
				else if(opts.id && !doc.getElementById(settings.id)) {
					console.error("!! landmark.js -> landmark element id ", settings.id, " does not exist");
					return false;
				}
				else if(typeof opts.id !== 'undefined') {
					isDrawn = true;
				}
			}

			// self-executing function that intializes $el
			(function() {
				var el;

				if(!isDrawn) {
					el = doc.createElement('div');
					el.setAttribute('id', settings.id);
					el.className = 'landmark-tip';
					el.style.display = 'none';
					doc.getElementsByTagName('body')[0].appendChild(el);
				} 
				else {			
					el = doc.getElementById(settings.id);
				}

				$el = $(el); // cache it for later
			})();

			this.each(function () {
				var $this = $(this);
				
				anchors.push({ 
					id: $this.attr('id'), 
					y: $this[0].offsetTop + $this[0].offsetHeight,
					$anchor: $this 
				});
			});

			win.onscroll = function (/* evt */) {
				var docEl = doc.documentElement, 
					body = doc.body,
					top = (docEl && docEl.scrollTop  || body && body.scrollTop  || 0),
					closest = {};

				// determines which of the landmarks is closest to the top and out of view
				for(var i = 0, len = anchors.length; i < len; i++) {
					var o = anchors[i];
					o.diff = Math.abs(o.y - top);

					if('undefined' === typeof closest.diff || o.diff < closest.diff 
						&& top > o.y) { 
							closest = o; 
						}
				}
	 			
				$el.text(closest.$anchor.data('anchor'));
				
				if(!isDrawn) {				
					$el.css('display', 'block');
					isDrawn = true;
				}
			};
		};
	})(jQuery, window, document);
}