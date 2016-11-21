import "babel-polyfill";

// import "./libs/imagesloaded.pkgd.js";
// import "./libs/isinvievport/isInViewport.js";


// import "./libs/flexibility/flexibility.js";

// global.jQuery = require('jquery');
// global.$ = global.jQuery;

// import "./libs/light-gallery/lightgallery.min.js";
// import "./libs/light-gallery/lg-thumbnail.min.js";
// import "./libs/light-gallery/lg-fullscreen.min.js";
import "./libs/sharrre/jquery.sharrre.js";
import "./libs/jquery-form/jquery.form.js";
import "./libs/validation/jquery.validate.js";
// import "./libs/validation/localization/messages_ru.js";

import GLOBAL from "./modules/GLOBAL";
import HOME from "./modules/HOME";
import ARTICLE from "./modules/ARTICLE";

let init = null;

switch (global.vars.page) {
  case 'home_page': init = HOME.init.bind(HOME); break;
  case 'article_page': init = ARTICLE.init.bind(ARTICLE); break;
  default:
    init = () => {
        console.log('default init');
    };
}

$(document).ready(()=>{
    GLOBAL.init();
    init();
});

$(window).on('resize', ()=> {

});

