/**
*      Article page
*/

// import lightGallery from 'lightgallery';

import "../libs/light-gallery/lightgallery.min.js";
import "../libs/light-gallery/lg-thumbnail.min.js";
import "../libs/light-gallery/lg-fullscreen.min.js";

export default {

	init() {
		this.lightGallery();
	},

	lightGallery () {
		$('.gallery').lightGallery(); 
		// require(['./lightgallery.js'], function() {
		// 	require(["./lg-zoom.js", "./lg-thumbnail.js"], function(){
		// 		$('.gallery').lightGallery(); 
		// 	});
		// });

	}

};