# Landmark.js
Landmark.js is a jquery plugin that allows you to display "landmarks" that the user passes by when scrolling vertically down the page.  It's useful for notifying the user what they're viewing/reading, which is especially useful in a mobile environment where screen real-estate is minimal.

## Usage
	$(document).ready(function() {
		$('.landmark').landmark(
			{ id: 'landmark-id' } /* this options object is optional */
		);
	});

	<div id="landmark-id">This is optional, if you do not specify where landmark.js should display the landmarks one will be created for you.</div>
	<a id="anchor-1" class="landmark" data-anchor="History of the Civil War">Anchor 1</a>