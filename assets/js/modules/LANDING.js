import '../libs/slick.js';

export default {

    init(){
        this.globalSliders();
    },

    globalSliders() {
        $('.testimonials-slider').not('.slick-initialized').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            responsive: [{
                breakpoint: 1023,
                settings: {
                    slidesToShow: 1
                }
            }]
        });
    }
}