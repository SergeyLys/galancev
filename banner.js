"use strict";
appMakeBeCool.gateway.addClass('BannerLocal', function(properties, $, $window, $document) {
    //PRIVATE VARIABLES
    var _bannerLocal = this,
    _defaults = {
        closeBanner: '.link-to'
        // prop
        // data
        // classes ans styles
    },
    _properties = $.extend(_defaults, properties),
    _globals = {
        // elements
        closeBanner: null,
        // prop
        preloaded: false
    },

    //PRIVATE METHODS
    _init = function() {
        appMakeBeCool.gateway.base.Class.apply(_bannerLocal, [_properties]);
        if(!_globals.preloaded) {
            return _bannerLocal.init();
        }
        _bannerLocal.globals.customCreate = function() {
            _config();
            _setup();
            _setBinds();
            _setCustomMethods();
        };
        _bannerLocal.create();
    },

    _config = function() {
        _globals.closeBanner = $(_properties.closeBanner);
    },

    _setup = function() {
        if (localStorage.getItem('banner') !== '') {
            switch(banner) {
              case 'notifyImg': 
                localStorage.clear();
                localStorage.setItem('banner', notifyImg); 
                $('.notify-wrap').html(notifyImg); 
                break;
              case 'notifyNoImg':
                localStorage.clear();
                localStorage.setItem('banner', notifyNoImg); 
                $('.notify-wrap').html(notifyNoImg); 
                break;
              case 'notifyImgMin':
                localStorage.clear();
                localStorage.setItem('banner', notifyImgMin); 
                $('.notify-wrap').html(notifyImgMin); 
                break;
              case 'notifyNoImgMin':
                localStorage.clear();
                localStorage.setItem('banner', notifyNoImgMin); 
                $('.notify-wrap').html(notifyNoImgMin); 
                break;
              default: console.log('no banner'); break;
            }
        }

        $('.notify .link-to').on('click', function() {
            $('.notify').slideUp();
            localStorage.clear();
            localStorage.setItem('banner', '');

            $(window).on('scroll', function() {
                if ($(window).scrollTop() > 0) {
                    $('.site-header').addClass('fixed');
                    $('body').css({
                        'padding-top': $('.site-header').height()
                    });
                    $('.notify-wrap').css({
                        'top': '-'+ $('.site-header').height() + 'px'
                    });
                } else if ($(window).scrollTop() <= 0) {
                    $('.site-header').removeClass('fixed');
                    $('body').css({
                        'padding-top': 0
                    });
                    $('.notify-wrap').css({
                        'top': 0
                    });
                }
            });
        });
    },

    _setBinds = function() {},

    _binds = function() {
        return {};
    },

    _triggers = function(){
        return {};
    },

    _setCustomMethods = function() {
        _bannerLocal.globals.customResurrect = function() {};
        _bannerLocal.globals.customDestroy = function() {};
    };

    //PUBLIC METHODS
    _bannerLocal.addMethod('init', function() {
        _bannerLocal.bind($window, _bannerLocal.globals.classType+'_Init', function(e, data, el) {
            _globals.preloaded = true;
            _init();
        });
    });

    //GO!
    _init();
});