import "babel-polyfill";

import GLOBAL from "./modules/GLOBAL";
import HOME from "./modules/HOME";
import ARTICLE from "./modules/ARTICLE";
import LANDING from "./modules/LANDING";

let init = null;

switch (global.vars.page) {
  case 'home_page': init = HOME.init.bind(HOME); break;
  case 'article_page': init = ARTICLE.init.bind(ARTICLE); break;
  case 'landing_page': init = LANDING.init.bind(LANDING); break;
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
    $('.tabs').tabsToSelect();
});