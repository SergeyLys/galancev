/**
*      Home page
*/

var jQueryBridget = require('jquery-bridget');
//var Masonry = require('masonry-layout');
var Isotope = require('isotope-layout');
jQueryBridget( 'isotope', Isotope, $ );


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

		$('.masonry').isotope({
			itemSelector: '.masonry-item',
			columnWidth: '.masonry-item',
			isResizable: true,
			isAnimatedFromBottom: true,
			animationOptions: {
				duration: 250,
				easing: "swing"
			},
			getSortData: {
				category: '[data-content]'
			}
		});


		$('.tabs .tab-item a').on('click', function(e) {
			e.preventDefault();
			var filterValue = $( this ).parent().attr('data-filter');
			$('.masonry').isotope({ filter: filterValue });
		});

	}

};