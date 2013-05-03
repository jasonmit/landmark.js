;(function ($, win, doc) {
	$.fn.landmark = function (opts) {
		var settings = $.extend({ 'id' : 'landmarkjs' }, opts),
			isDrawn = false,
			anchors = [], 
			onScroll,
			el,
			$el,
			innerText;
		
		if(opts) {
			if(typeof opts.id === 'undefined' && document.getElementById(settings.id)) {
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

		this.each(function () {
			var $this = $(this);
			
			anchors.push({ 
				id: $this.attr('id'), 
				y: $this[0].offsetTop + $this[0].offsetHeight,
				$el: $this 
			});
		});

		onScroll = function (e) {
			var docEl = doc.documentElement, 
				body = doc.body,
				top = (docEl && docEl.scrollTop  || body && body.scrollTop  || 0),
				closest = {};

			anchors.forEach(function (o) {
				o.diff = Math.abs(o.y - top);

				if(typeof closest.diff === 'undefined' || o.diff < closest.diff && top > o.y) {
					closest = o;
				}
			});
 			
			$el.text(closest.$el.data('anchor'));
			
			if(!isDrawn) {
				el.style.display = 'block';
				isDrawn = true;
			}
		};

		win.onscroll = onScroll; /* todo: this can be debounced */
	};
})(jQuery, window, document);
