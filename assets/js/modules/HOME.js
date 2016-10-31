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

            $('.animateFadeIn').animated("fadeIn");
            $('.animateFadeInUp').animated("fadeInUp");
            $('.animateFadeInDown').animated("fadeInDown");
            $('.animateFadeInLeft').animated("fadeInLeft");
            $('.animateFadeInRight').animated("fadeInRight");
            $('.animateFullWidth').animated('fullWidth');
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
        var canvas = document.getElementById('canvas');
        canvas.width = 100;
        canvas.height = 100;
    },

    offsetSlider() {
        $('.expert-slider').slick({
            centerMode: true,
            slidesToShow: 4
        });
    }

};