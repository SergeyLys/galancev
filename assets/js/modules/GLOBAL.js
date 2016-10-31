/**
 *      Global functions
 */

import slick from "slick-carousel";
import waypoint from '../libs/waypoints.min.js';

(function($) {
    $.fn.animated = function(inEffect) {
        $(this).css("opacity", "0").addClass("animated").waypoint(function(dir) {
            if (dir === "down") {
              if ($(this).data('animate-delay')) {
                var that = $(this);
                var delay = $(this).data('animate-delay');

                setTimeout(function() {
                  that.addClass(inEffect).css("opacity", "1");
                }, delay);
                
              } else {
                $(this).addClass(inEffect).css("opacity", "1");
              }
            }
        }, {
            offset: "90%"
        });
    };
})(jQuery);

export default {

    init(){
        this.headerFunctions();
        this.scrollDown();
        this.scrollAnimations();
    },

    headerFunctions () {
      $('.site-navigation').on('click', () => {
        $('.toggle-menu').removeClass('active');
        $('.site-navigation').removeClass('active');
        $('body').removeClass('menu-open');
      });

      $('.menu-concept, .menu-inside, site-authorisation').on('click', (e) => {
        e.stopPropagation();
      });

      $('.toggle-menu').on('click', (e) => {
        e.preventDefault();

        $('body, html').animate({
          scrollTop: $('.site-header').offset().top
        }, 500);

        $('.toggle-menu').toggleClass('active');
        $('.site-navigation').toggleClass('active');
        $('body').toggleClass('menu-open');
        
      });

      $('.has-sub').on('click', function() {
        $(this).find('.sub-menu').stop().slideToggle();
      });
    },

    scrollDown() {
      $('.scroll-down').on('click', function() {
        var position = $(this).closest('section').offset().top + $(this).closest('section').prop('scrollHeight');

        $('body, html').animate({
          'scrollTop': position
        }, 800)
      });
    },

    scrollAnimations() {
      $('.animateFadeIn').animated("fadeIn");
      $('.animateFadeInUp').animated("fadeInUp");
      $('.animateFadeInDown').animated("fadeInDown");
      $('.animateFadeInLeft').animated("fadeInLeft");
      $('.animateFadeInRight').animated("fadeInRight");
      $('.animateFullWidth').animated('fullWidth');

      // $('#thing').waypoint(function() {
      //   console.log('waypoint triggered')
      // })
      // var waypoint = new Waypoint({
      //   element: document.getElementById('thing'),
      //   handler: function(dir) {
      //     console.log('Basic waypoint triggered')
      //   }
      // })
    }
};