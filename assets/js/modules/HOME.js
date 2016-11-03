/**
 *      Home page
 */

export default {

    init() {
        this.closeBook();
        this.taskHover();
        this.numericGrid();
        this.canvas();
        this.offsetSlider();
    },

    closeBook () {
        $('.home-book .close-button').on('click', () => {
            $('.home-book').slideUp(200);
        });
    },

    taskHover() {
        $('.b-tasks').on('mousemove', function(e) {
            if ($(window).width() >= 1024) {
                var line = $('.cursor-line');
                var lineCenter = [line.offset().left + line.width() / 2, line.offset().top + line.height() / 2];
                var angle = Math.atan2(e.pageX - lineCenter[0], - (e.pageY - lineCenter[1])) * (180 / Math.PI);

                // console.log(angle);
                // if (angle >= 45) {
                //   angle = 45;
                // }

                // if (angle <= -45) {
                //   angle = -45;
                // }

                if (angle >= 10) {
                    $('.task--left > .b-task_descr').css({
                        'filter': 'blur(5px)'
                    });
                    $('.task--right > .b-task_descr').css({
                        'filter': 'blur(0)'
                    });
                }

                if (angle <= -10) {
                    $('.task--right > .b-task_descr').css({
                        'filter': 'blur(5px)'
                    });
                    $('.task--left > .b-task_descr').css({
                        'filter': 'blur(0)'
                    });
                }

                line.css({ "-webkit-transform": 'rotate(' + angle + 'deg)'});
                line.css({ '-moz-transform': 'rotate(' + angle + 'deg)'});
                line.css({ 'transform': 'rotate(' + angle + 'deg)'});
                line.css({ 'opacity': '1'});
            }
        });
    },

    numericGrid() {
        $('.numeric-grid_item').each(function(ind) {
            if ($(this).find('.number').length != 0) {
                $(this).find('.number').html(ind);
            }
        });
    },

    canvas() {
        var triggered_times = 0;

        var animateSvgInit = function () {
            var pagePos = window.pageYOffset;
            var anchorPos = $('.b-practice_title').offset().top - ($('.b-practice_title').height() + $('.b-practice_title').height() / 2);

            if(pagePos > anchorPos && triggered_times == 0 ) {

                var group1 = $('#path-01_1_'),
                    group2 = $('#path-02'),
                    group3 = $('#path-03'),
                    group4 = $('#path-04'),
                    group5 = $('#path-05'),
                    tl;

                tl = new TimelineMax();

                tl
                    .set(group1, {opacity: 1})
                    .set(group2, {opacity: 1})
                    .set(group3, {opacity: 1})
                    .set(group4, {opacity: 1})
                    .set(group5, {opacity: 1});


                tl
                    .to(group1, 1.5, {opacity: 1, morphSVG: 'M628.3,14.4L9.1,64.5'},.5)
                    .to(group2, 1.5, {opacity: 1, morphSVG: 'M9.1,64.5l159.8,181.4'},.5)
                    .to(group3, 1.5, {opacity: 1, morphSVG: 'M168.8,245.8L628.3,14.4'},.5)
                    .to(group4, 1.5, {opacity: 1, morphSVG: 'M529,303.4L9.1,64.5'},.5)
                    .to(group5, 1.5, {opacity: 1, morphSVG: 'M628.3,14.4l-99.3,289'},.5);

                triggered_times = 1;

            }
        };

        animateSvgInit();

        $(window).on('scroll', function() {
            animateSvgInit();
        });



    },

    offsetSlider() {
        $('.expert-slider').slick({
            // centerMode: true,
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

};