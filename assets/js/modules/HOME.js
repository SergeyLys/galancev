/**
*      Home page
*/

export default {

	init() {
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
	}

};