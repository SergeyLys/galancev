/**
*      Article page
*/

import "../libs/light-gallery/lightgallery.min.js";
import "../libs/light-gallery/lg-thumbnail.min.js";
import "../libs/light-gallery/lg-fullscreen.min.js";

export default {

	init() {
		this.lightGallery();
	},

	lightGallery () {
		$('.gallery').lightGallery(); 
	}

};