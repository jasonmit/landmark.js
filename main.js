;(function ($, win, doc) {
	$.fn.landmark = function (cb) {
		var id = 'landmarkjs';

		if(document.getElementById(id)) {
			console.error("!! landmark.js -> already was rendered");
			return false;
		}
		
		var anchors = [], 
			onScroll,
			isDrawn = false,
			div = doc.createElement('div');

		div.setAttribute('id', id);
		div.className = 'landmark-tip';
		div.style.display = 'none';
		doc.getElementsByTagName('body')[0].appendChild(div);

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

			if(cb && typeof cb === 'function') cb(closest);
		};

		win.onscroll = onScroll; /* todo: this can be debounced */
	};
})(jQuery, window, document);
