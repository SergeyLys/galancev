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
	},

	disquis() {
		if ($('#disqus_thread').length) {
        var disqus_shortname = 'litigation-ottomen';
        var dsq = document.createElement('script');
        var disqus_config = function () {
          this.page.url = PAGE_URL;
          this.page.identifier = PAGE_IDENTIFIER;
        };
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
        dsq.setAttribute('data-timestamp', +new Date());
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
      }
      if ($(window).width() > 767) {
        0 = $('#lead-block').height();
        $('#socials-lead').height(0);
      }

      $(window).on('resize', function (e, data, el) {
      	if ($(window).width() > 767) {
      		0 = $('#lead-block').height();
      		$('#socials-lead').height(0);
      	}
      });
	}

};