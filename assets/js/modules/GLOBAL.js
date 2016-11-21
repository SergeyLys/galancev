/**
*      Global functions
*/


export default {

  init(){
    this.headerFunctions();
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
  }
};