/**
*      Global functions
*/

//global.jQuery = require('jquery');
//global.$ = global.jQuery;

import "../libs/sharrre/jquery.sharrre.js";
// import "../libs/jquery-form/jquery.form.js";
import '../libs/jquery.validate.js';
var jQueryBridget = require('jquery-bridget');
var Isotope = require('isotope-layout');
var imagesLoaded = require('imagesloaded');
jQueryBridget( 'isotope', Isotope, $ );

(function($) {
  $.fn.formSubmit = function() {
    $(this).each(function() {
      var that = this;
      $(this).validate({
        rules: {
          name: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: formValidateSettings.name,
          message: formValidateSettings.messageEmpty,
          email: {
            required: formValidateSettings.emailEmpty,
            email: formValidateSettings.emailIncorrect
          }
        },

        submitHandler: function submitHandler(form, e) {
          e.preventDefault();
          var $form = $(that);
          $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            dataType: 'json',
            data: $form.serialize()
          }).done(function (data) {
            if(data.title === undefined) data.title = '';
            if(data.message === undefined) data.message = '';
            if (data.success == true) {
              $form.hide(200);
              $form[0].reset();

              var formSuccess = $('<div></div>').addClass('form-success');
              formSuccess.html('<div class="state-icon"></div> <div class="form-title">' + data.title + '</div> <div class="form-descr">' + data.message + '</div>');
              $form.parent().append(formSuccess);

              setTimeout(function () {
                $form.parent().find('.form-success').show(200);
              }, 200);

              setTimeout(function () {
                $form.parent().find('.form-success').hide(200);
              }, 3000);

              setTimeout(function () {
                $form.parent().find('.form-success').remove();
                $form.parent().find('.form-success');
                $form.show(200);
              }, 3200);
            } else {
              $form.hide(200);

              var formError = $('<div></div>').addClass('form-error');
              formError.html('<div class="state-icon"></div> <div class="form-title">' + data.title + '</div> <div class="form-descr">' + data.message + '</div><a href="#" class="btn">' + formValidateSettings.send_again + '</a>');
              $form.parent().append(formError);

              setTimeout(function () {
                $form.parent().find('.form-error').show(200);
              }, 200);

              $form.parent().find('.form-error').find('a').on('click', function (e) {
                e.preventDefault();
                $form.parent().find('.form-error').hide(200);

                setTimeout(function () {
                  $form.parent().find('.form-error').remove();
                  $form.show(200);
                }, 200);
              });
            }
          }).fail(function () {
            $form.hide(200);

            var formError = $('<div></div>').addClass('form-error');
            formError.html('<div class="state-icon"></div> <div class="form-title">' + formValidateSettings.send_error_title + '</div> <div class="form-descr">' + formValidateSettings.send_error_message + '</div> <a href="#" class="btn">' + formValidateSettings.send_again + '</a>');
            $form.parent().append(formError);

            setTimeout(function () {
              $form.parent().find('.form-error').show(200);
            }, 200);

            $form.parent().find('.form-error').find('a').on('click', function (e) {
              e.preventDefault();
              $form.parent().find('.form-error').hide(200);

              setTimeout(function () {
                $form.parent().find('.form-error').remove();
                $form.show(200);
              }, 200);
            });
          });
        }
      });
    })
  }

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
    this.banner();
    this.headerFunctions();
    this.articleFunctions();
    this.sharrre();
    this.tabsToSelect();
    this.masonryGrid();
    this.formValidate();
    this.globalSliders();
    this.scrollToAnchor();
  },

  banner() {
    //if (localStorage.getItem('banner') !== '') {
    //  switch(banner) {
    //    case 'notifyImg':
    //      localStorage.clear();
    //      localStorage.setItem('banner', notifyImg);
    //      $('.notify-wrap').html(notifyImg);
    //      break;
    //    case 'notifyNoImg':
    //      localStorage.clear();
    //      localStorage.setItem('banner', notifyNoImg);
    //      $('.notify-wrap').html(notifyNoImg);
    //      break;
    //    case 'notifyImgMin':
    //      localStorage.clear();
    //      localStorage.setItem('banner', notifyImgMin);
    //      $('.notify-wrap').html(notifyImgMin);
    //      break;
    //    case 'notifyNoImgMin':
    //      localStorage.clear();
    //      localStorage.setItem('banner', notifyNoImgMin);
    //      $('.notify-wrap').html(notifyNoImgMin);
    //      break;
    //    default: console.log('no banner'); break;
    //  }
    //}

    var notifycationLocal = localStorage.getItem('notifycations');
    notifycationLocal = notifycationLocal ? JSON.parse(notifycationLocal) : [];
    var notifycations = $('.notify[data-notify]');
    if(notifycations.length){
      for(var i = 0; i <= notifycations.length; i++){
        if(notifycationLocal.indexOf($(notifycations[i]).attr('data-notify')) === -1){
          $(notifycations[i]).show();
        }
      }
    }

    $('.notify[data-notify] .link-to').on('click', function() {
      //$('.notify').slideUp();
      //localStorage.clear();
      //localStorage.setItem('banner', '');

      var notify = $(this).closest('.notify[data-notify]');
      notify.slideUp();
      var notifyNumber = notify.attr('data-notify');
      if(notifycationLocal.indexOf(notifyNumber) === -1){
        notifycationLocal.push(notifyNumber);
        localStorage.setItem('notifycations', JSON.stringify(notifycationLocal));
      }

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

  headerFunctions () {
    var trigger = $('.site-header').offset().top;

    if ($(window).width() >= 768) {
      $('.header-wrap').css({
        'min-height': $('.site-header').innerHeight()
      });
    }

    $('li.has-sub a').on('click', function(e) {
      e.preventDefault();
      if ($(this).parent().find('.sub-menu').length && $(window).width() <= 1023) {
        $(this).parent().find('.sub-menu').slideToggle();
      }
    });

    $('.burger').on('click', function() {
      $('.site-header').toggleClass('active');

      if($(window).width() <= 1023) {
        $('.header_menu').toggleClass('active');
        $('body').toggleClass('menu-open');
      }
    });

    $(window).on('scroll', function() {
      if ($('.header_menu').hasClass('active') && $(window).width() >= 1024 || $('.site-header').hasClass('active') && !$('.search-form').hasClass('active')) {
        $('.site-header').removeClass('active');
        $('.header_menu').removeClass('active');
      }
      if ($(window).scrollTop() > trigger) {
        $('.site-header').addClass('fixed');
        
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
      if ($(window).width() >= 768) {
        $('.header-wrap').css({
          'min-height': $('.site-header').innerHeight()
        });
      }

      if($(window).width() <= 1023 && $('.site-header').hasClass('active')) {
        $('.header_menu').addClass('active');
        $('body').addClass('menu-open');
      } else if ($(window).width() >= 1024) {
        $('body').removeClass('menu-open');
      }
    });

    $('.b-search').on('click', function() {
      $(this).toggleClass('active');
      $('.search-form').toggleClass('active');

      if ($(window).width() >= 1024) {
        if ($('.site-header').hasClass('active') && $('.site-header').hasClass('search-open')) {
          $('.site-header').removeClass('active').removeClass('search-open');
        } else {
          $('.site-header').addClass('active').addClass('search-open');
        }
      } else {
        $('.site-header').toggleClass('search-open');
      }



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
    if ($('.n-vk').length) {
       $('.n-vk').html(VK.Share.button(window.location.href, {
         noparse: true,
         type: 'custom',
         text: '<span class="fa fa-vk">'+$('.n-vk').attr('data-content')+'</span>'
       }));
     }
    // if ($('.feed__list .fa-vk').length) {
    //  $('.feed__list .fa-vk').sharrre({
    //     share: {facebook: true},
    //     url: $(this).data('url') != 'undefined' ? $(this).data('url') : '',
    //     text: $(this).data('text') != 'undefined' ? $(this).data('text') : '',
    //     enableHover: false,
    //     enableCounter: false,
    //     template: '<span></span>',
    //     click: function (api, options) {
    //       api.simulateClick();
    //       api.openPopup('facebook');
    //     }
    //  })
    // }
  },

  articleFunctions() {
    $(window).on('resize', function (e, data, el) {
      setNotesAltitude();
      setFeedBlockTop();
    });

    $(window).on('scroll', function (e, data, el) {
      toggleOnScrollImages();
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

    $('.definition--group .definition__column').on('mouseover', function (e, data, el) {
      hoverDigits($(this));
    });
    
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
          if (digitUrl !== currentUrl) {
            $('.definition--group').css({
              backgroundImage: `url(${digitUrl})`
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
        time: function time(elem) {
          return parseInt($(elem).attr('data-time'));
        }
      }
    });

    $('.masonry').on('masonry', function (e) {
      var html = $(e.detail.html);
      $('.masonry').imagesLoaded(function (e) {
        $('.masonry').append(html).isotope('appended', html).isotope('layout');
        setTimeout(function () {
          $('.masonry').isotope({ sortBy: 'time', sortAscending: false });
        }, 0);
      });
    });

    $('#btn-more-articles').on('click', function (event) {
      event.preventDefault();
      var params = {
        ids: []
      };
      params.parents = $('.tab-item.active[data-filter]').attr('data-id');
      if (params.parents === '*') {
        params.parents = [];
        var category = $('.tab-item[data-filter]').not('.active');
        for (var i = 0; i < category.length; i++) {
          params.parents.push($(category[i]).attr('data-id'));
        }
      }

      var masonry_items = $('.masonry .masonry-item');
      if (masonry_items) {
        for (var i = 0; i < masonry_items.length; i++) {
          params.ids.push($(masonry_items[i]).attr('data-id'));
        }
      }

      $.post('/api/articles', params, function (response) {
        if (response && response['total']) {
          var html = '';
          for (var i = 0; i < response['total']; i++) {
            var publishedon = new Date(parseInt(response.rows[i].publishedon) * 1e3);
            var publishedon_formatter;
            var now = Date.now();
            var start_today = new Date();
            start_today.setHours(0, 0, 0, 0);
            var difference = now - publishedon;
            switch (true) {
              case difference < 6e4:
                publishedon_formatter = Math.floor(difference / 1e3) + ' ' + formValidateSettings.sec_ago;
                break;
              case difference < 36e5:
                publishedon_formatter = Math.floor(difference / 6e4) + ' ' + formValidateSettings.min_ago;
                break;
              case difference < 864e5 && start_today < publishedon:
                publishedon_formatter = Math.floor(difference / 36e5) + ' ' + formValidateSettings.hour_ago;
                break;
              case difference < 864e5 && start_today > publishedon:
                publishedon_formatter = formValidateSettings.yesterday + ' ' + publishedon.toLocaleString("ru", {
                  hour: 'numeric',
                  minute: 'numeric'
                });
                break;
              default:
                publishedon_formatter = publishedon.toLocaleString("ru", {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'
                });

            }
            html += '<div data-id="' + response.rows[i].id + '" data-time="' + response.rows[i].publishedon + '" class="col-xs-12 col-sm-6 col-md-4 masonry-item" data-category="' + response.rows[i].parent + '"><article class="blocks__article">';
            if (response.rows[i].img) html += '<div class="article__top"><div class="article__top-picture"><img src="' + response.rows[i].img + '" alt="' + response.rows[i].pagetitle + '"></div><a href="' + response.rows[i].uri + '" rel="nofollow" class="article__top-link"></a></div>';
            html += '<div class="article__bottom"><div class="story-top"><time class="story__time" datetime="' + publishedon.toISOString() + '">' + publishedon_formatter + '</time><a href="' + response.rows[i].category_uri + '" class="label">' + response.rows[i].category_menutitle + '</a></div><h3 class="article__title"><a href="' + response.rows[i].uri + '">' + response.rows[i].pagetitle + '</a></h3>';
            if (response.rows[i].source_title && response.rows[i].source_link) {
              html += '<a href="' + response.rows[i].source_link + '" class="article__source">';
              html += response.rows[i].source_img ? '<img src="' + response.rows[i].source_img + '" alt="' + response.rows[i].source_title + '" class="article__source-img">' : '<span class="article__source-link">' + response.rows[i].source_title + '</span></a>';
            }
            html += '</div></article></div>';
          }
          html = $(html);
          $('.masonry').imagesLoaded(function (e) {
            $('.masonry').append(html).isotope('appended', html).isotope('layout');
            setTimeout(function () {
              if ($('.masonry .masonry-item:not(:has(form)):visible').length >= parseInt($('.tab-item.active[data-all]').attr('data-all'))) {
                $('#btn-more-articles').hide();
              }
              $('.masonry').isotope({ sortBy: 'time', sortAscending: false });
            }, 0);
          });
        }

      }, "json").fail(function (error) {});
    });

    $('.tabs .tab-item a').on('click', function (e) {
      e.preventDefault();
      var filterValue = $(this).parent().attr('data-filter');
      $('.masonry').isotope({ filter: filterValue });
      setTimeout(function () {
        $('.masonry').isotope({ sortBy: 'time', sortAscending: false });
      }, 0);

      $('.tabs .tab-item').removeClass('active');
      $(this).parent().addClass('active');

      if ($('.masonry .masonry-item'+filterValue+':not(:has(form))').length >= parseInt($(this).parent().attr('data-all'))) {
        $('#btn-more-articles').hide();
      } else {
        $('#btn-more-articles').show();
      }
    });

    $('#btn-more-articles').trigger('click');
  },

  formValidate() {
    $('form:not(.search-form, .form--search)').formSubmit();
  },

  globalSliders() {
    $('.testimonials-slider').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    });
  },

  scrollToAnchor() {
    $('.has-anchor').on('click', function(e) {
      if ($($(this).attr('href')).length != 0) {
        e.preventDefault();
        $('body, html').animate({
          'scrollTop': $($(this).attr('href')).offset().top + 'px'
        }, 500);
      }
    });
  }
};