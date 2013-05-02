;(function ($, win, doc) {
	$.fn.landmark = function (opts) {
		var settings = $.extend({ 'id' : 'landmarkjs' }, opts);
		
		if(opts) {
			if(typeof opts.id === 'undefined' && document.getElementById(settings.id)) {
				console.error("!! landmark.js -> already was rendered");
				return false;
			}
			else if(opts.id && !doc.getElementById(settings.id)) {
				console.error("!! landmark.js -> landmark element id ", settings.id, " does not exist");
				return false;
			}
		}

		var anchors = [], 
			onScroll,
			isDrawn = opts && typeof opts.id !== 'undefined',
			div;

		if(!isDrawn) {
			console.log('Does not exist, creating');
			div = doc.createElement('div');
			div.setAttribute('id', settings.id);
			div.className = 'landmark-tip';
			div.style.display = 'none';
			doc.getElementsByTagName('body')[0].appendChild(div);
		} else {			
			div = doc.getElementById(settings.id);
		}

		this.each(function () {
			var $this = $(this);

			anchors.push({ 
				id: $this.attr('id'), 
				y: $this[0].offsetTop + $this[0].offsetHeight 
			});
		});

		onScroll = function (e) {
			var docEl = doc.documentElement, 
				body = doc.body,
				top = (docEl && docEl.scrollTop  || body && body.scrollTop  || 0),
				closest = {};

			anchors.forEach(function (o) {
				o.diff = Math.abs(o.y - top); 

				if(typeof closest.diff === 'undefined' || o.diff < closest.diff) {
					closest = o;
				}
			});

			div.textContent = $('#' + closest.id).data('anchor');
			
			if(!isDrawn) {
				div.style.display = 'block';
				isDrawn = true;
			}
		};

		win.onscroll = onScroll; /* todo: this can be debounced */
	};
})(jQuery, window, document);
