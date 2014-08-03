# Landmark.js
Landmark.js is a simple, light-weight, jquery plugin that allows you to display, what I call, "landmarks" as the user passes them while scrolling. 

It's useful for notifying the user of the context of what they're reading if your page covers multiple topics.  This allows for the user to rapidly scroll through your document to get to what they interested in.

## Demo
http://codepen.io/anon/pen/lHGId

## Usage
	$(document).ready(function() {
		$('.landmark').landmark(
			{ id: 'landmark-id' } /* this options object is optional */
		);
	});

	<div id="landmark-id">This is optional, if you do not specify where landmark.js should display the landmarks one will be created for you.</div>
	<a id="anchor-1" class="landmark" data-anchor="History of the Civil War">Anchor 1</a>

Included is example.html which should help you can get a better feeling for how this plugin is used.
