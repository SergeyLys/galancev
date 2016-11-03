/**
 *      Global functions
 */

global.jQuery = require('jquery');
global.$ = global.jQuery;

import 'gsap';
import '../libs/MorphSVGPlugin.min';
import slick from "slick-carousel";
import jQueryBridget from 'jquery-bridget';
import masonry from 'masonry-layout';
import AOS from 'aos';

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
        AOS.init({
            duration: 800,
            easing: 'ease'
        });
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