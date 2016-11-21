/**
*      Home page
*/

var jQueryBridget = require('jquery-bridget');
var Masonry = require('masonry-layout');
jQueryBridget( 'masonry', Masonry, $ );

export default {

	init() {
		this.masonryGrid();
		this.oneHeightTitles();
	},

	oneHeightTitles() {
		var bigbrother;

		function oneHeight() {
			bigbrother = -1;

			$('.list-column').each(function() {
				bigbrother = bigbrother > $(this).find('h3').outerHeight() ? bigbrother : $(this).find('h3').outerHeight();
			});
		}
		

		if ($(window).width() >= 1280) {
			oneHeight();
			$('.list-column').each(function() {
				$(this).find('h3').height(bigbrother);
			});
		}

		$(window).on('resize', function() {
			if ($(window).width() >= 1280) {
				oneHeight();
				$('.list-column').each(function() {
					$(this).find('h3').height(bigbrother);
				});
			}
		})
	},

	masonryGrid () {

		var $grid = $('.masonry').masonry({
			itemSelector: '.masonry-item',
			columnWidth: '.masonry-item',
			isResizable: true,
			animationOptions: {
				duration: 250,
				easing: "swing"
			},
			isAnimatedFromBottom: true
		});

		if ($(window).width() >= 768) {
				$grid.masonry();
		}

		$('.tabs .tab-item a').on('click', function(e) {
			e.preventDefault();
			var tab = $(this).parent().attr('data-tab');
			$('.masonry-item').css({'display': 'none'});
			$('[data-content="'+ tab +'"]').parent('.masonry-item').css({'display': 'block'});

			if ($(window).width() >= 768) {
				$grid.masonry();
			}
		})

		// if ($('.blocks__article').length) {
		// 	$('.blocks__article').each(function () {
		// 		var $item = $(this);
		// 		//_isInViewport($item);

		// 	});
		// }
	}

};