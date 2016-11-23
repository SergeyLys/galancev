/**
*      Global functions
*/


var jQueryBridget = require('jquery-bridget');
var Isotope = require('isotope-layout');
jQueryBridget( 'isotope', Isotope, $ );


(function($) {
  $.fn.tabsToSelect = function() {
    return $(this).each(function() {

      if ($(window).width() <= 1023) {

        if ($('.tab-selector').length == 0) {
          var that = $(this);
          var tabsWrap = $('<div></div>').addClass('tab-selector');
          var activeTab = $('<span></span>').addClass('active-tab');
          $(this).wrapAll(tabsWrap);
          $(this).parent().append(activeTab);

          if ($(this).find('li.active').length) {
            activeTab.html($(this).find('li.active > a').html());
          } else {
            activeTab.html($(this).find('li').eq(0).find('a').html());
          }


          $('.tab-selector').on('click', function(e) {
            if ($(window).width() <= 1023) {
              e.stopPropagation();
              that.slideToggle();
            }
          });

          $('.tab-selector a').on('click', function(e) {
            if ($(window).width() <= 1023) {
              e.stopPropagation();
              $(that).slideUp(100);
              activeTab.html($(this).html());
            }
          });

          $(document).on('click', function() {
            if ($(window).width() <= 1023) {
              $(that).slideUp(100);
            }
          });
        }
      }
    })
  }
})(jQuery);


export default {

  init(){
    this.headerFunctions();
    this.articleFunctions();
    this.sharrre();
    this.tabsToSelect();
    this.masonryGrid();
  },

  headerFunctions () {
    var trigger = $('.site-header').offset().top;

    $('li.has-sub a').on('click', function(e) {
      e.preventDefault();
      if ($(this).parent().find('.sub-menu').length && $(window).width() <= 1023) {
        $(this).parent().find('.sub-menu').slideToggle();
      }
    });

    $('.burger').on('click', function() {
      $('.site-header').toggleClass('active');
      $('body').toggleClass('menu-open');

      if($(window).width() <= 1023) {
        $('.header_menu').toggleClass('active');
      }
    });

    $(window).on('scroll', function() {
      if ($('.header_menu').hasClass('active') && $(window).width() >= 1024 || $('.site-header').hasClass('active') && !$('.search-form').hasClass('active')) {
        $('.site-header').removeClass('active');
        $('.header_menu').removeClass('active');
      }
      if ($(window).scrollTop() > trigger) {
        $('.site-header').addClass('fixed');
        $('body').css({
          'padding-top': $('.site-header').height()
        });
        $('.notify-wrap').css({
          'top': '-'+ $('.site-header').height() + 'px'
        });
      } else if ($(window).scrollTop() <= trigger) {
        $('.site-header').removeClass('fixed');
        $('body').css({
          'padding-top': 0
        });
        $('.notify-wrap').css({
          'top': 0
        });
      }
    });

    $(window).on('resize', function() {
      if($(window).width() <= 1023 && $('.site-header').hasClass('active')) {
        $('.header_menu').addClass('active');
        $('body').addClass('menu-open');
      } else if ($(window).width() >= 1024) {
        $('body').removeClass('menu-open');
      }
    })

    $('.b-search').on('click', function() {
      $(this).toggleClass('active');
      $('.search-form').toggleClass('active');
      $('.site-header').toggleClass('active').toggleClass('search-open');
    });
  },

  sharrre() {
    if ($('.feed__list .fa-twitter').length) {
      $('.feed__list .fa-twitter').sharrre({
        share: {twitter: true},
        url: $(this).data('url') != 'undefined' ? $(this).data('url') : '',
        text: $(this).data('text') != 'undefined' ? $(this).data('text') : '',
        enableHover: false,
        enableCounter: false,
        template: '<span></span>',
        click: function (api, options) {
          api.simulateClick();
          api.openPopup('twitter');
        }
      });
    }
    if ($('.feed__list .fa-facebook').length) {
      $('.feed__list .fa-facebook').sharrre({
        share: {facebook: true},
        url: $(this).data('url') != 'undefined' ? $(this).data('url') : '',
        text: $(this).data('text') != 'undefined' ? $(this).data('text') : '',
        enableHover: false,
        enableCounter: false,
        template: '<span></span>',
        click: function (api, options) {
          api.simulateClick();
          api.openPopup('facebook');
        }
      });
    }
    //if ($('.n-vk').length) {
    //  $('.n-vk').html(VK.Share.button(window.location.href, {
    //    noparse: true,
    //    type: 'custom',
    //    text: '<span class="fa fa-vk"></span>'
    //  }));
    //}
  },

  articleFunctions() {
    $(window).on('resize', function (e, data, el) {
      setNotesAltitude();
      setFeedBlockTop();
    });

    $(window).on('scroll', function (e, data, el) {
      toggleOnScrollImages();
    });

    $('.definition--group .definition__column').on('mouseover', function (e, data, el) {
      hoverDigits($(el));
    });

    $('.droplist__state').on('click', function (e, data, el) {
      var $droplist = $(this).closest('.droplist');
      var $droplistState = $droplist.find('.droplist__state');
      var $dropp = $droplist.find('.droplist__list');
      if (!$dropp.hasClass('active')) {
        $dropp.addClass('active');
        $droplistState.addClass('active');
      } else {
        $dropp.removeClass('active');
        $droplistState.removeClass('active');
      }
    });


    var setFeedBlockTop = function () {
      var top = 0;
      if ($(window).width() >= 768 && $('#content-data').length) {
        top = $('#content-data').position().top;
        $('#feed').css({
          top: top
        });
      }
    };

    setFeedBlockTop();

    var setNotesAltitude = function () {
      if ($(window).width() >= 768) {
        $('.note-digit').each(function () {
          var $digit = $(this);
          var digitId = $digit.attr('id');
          var $note = $('.' + digitId);
          var digitOffsetTop = $digit.position().top;
          $note.css({
            top: digitOffsetTop
          });
        });
        $('.note--p').each(function () {
          var $note = $(this);
          var $relatedP = $note.prev().length ? $note.prev() : $note.parent();
          var relatedPOffsetTop = $relatedP.position().top;
          $note.css({
            top: relatedPOffsetTop
          });

        });
      }
    };
    
    var hoverDigits = function ($node) {
      var $digit = $node.find('.definition__digit');
      var $definitionGroup = $node.closest('.definition--group');
      var currentUrl = $definitionGroup.css('background-image');
      var digitUrl = $digit.data('bgimage');
      if ($(window).width() >= 1280 && digitUrl !== currentUrl) {
        $definitionGroup.css({
          backgroundImage: "url('" + digitUrl + "')"
        });
      }
    };

    var toggleOnScrollImages = function () {
      var $digits = null;
      if ($('.definition--group').length && $(window).width() >= 768 && $(window).width() < 1280) {
        $digits = $('.definition--group').find('.definition__digit');
        $digits.each(function () {
          var currentUrl = $('.definition--group').css('background-image');
          var digitUrl = $(this).data('bgimage');
          if ($(this).is(':in-viewport') && digitUrl !== currentUrl) {
            $('.definition--group').css({
              backgroundImage: "url('" + digitUrl + "')"
            });
          }
        });
      }
    };
  },

  tabsToSelect() {
    $('.tabs').tabsToSelect();
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

      $('.tabs .tab-item').removeClass('active');
      $(this).parent().addClass('active');
    });

  }
};