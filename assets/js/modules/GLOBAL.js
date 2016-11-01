/**
 *      Global functions
 */

//import ScrollMagic from 'scrollmagic';
//import '../../../node_modules/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
//import '../../../node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import 'gsap';
import '../libs/MorphSVGPlugin.min';
import slick from "slick-carousel";
import waypoint from '../libs/waypoints.min.js';
import jQueryBridget from 'jquery-bridget';
import masonry from 'masonry-layout';

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
        //$(this).each(function(index, elem) {
        //    $(this).css("opacity", "0").addClass("animated");
        //    var controller = new ScrollMagic.Controller();
        //
        //    var animationInit = function() {
        //        new ScrollMagic.Scene({
        //            triggerElement: elem,
        //            triggerHook: "0.8"
        //        })
        //            .setClassToggle(elem, inEffect)
        //            .addTo(controller);
        //    };
        //
        //    if ($(this).data('animate-delay')) {
        //        var delay = $(this).data('animate-delay');
        //        setTimeout(function() {
        //            animationInit();
        //        }, delay);
        //    } else {
        //        animationInit();
        //    }
        //
        //})
    };
})(jQuery);

export default {

    init(){
        this.headerFunctions();
        this.scrollDown();
        this.scrollAnimations();
        this.masonry();
    },

    headerFunctions () {
      $('.site-navigation').on('click', () => {
        $('.toggle-menu').removeClass('active');
        $('.site-navigation').removeClass('active');
        $('body').removeClass('menu-open');
      });

      $('.menu-concept, .menu-inside, .site-authorisation').on('click', (e) => {
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
    },

    masonry() {
        jQueryBridget( 'masonry', masonry);
        $('.masonry-grid').masonry({
            itemSelector: '.masonry-item',
            columnWidth: '.masonry-item',
            gutter: 0
        });
    }

};