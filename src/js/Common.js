import objectFitImages from 'object-fit-images';
import '@fancyapps/fancybox';
import {$body, detectIE, css, Resp} from './_helpers';

import './components/Header';
import './components/Form';
import './components/Sliders';
import './components/Tabs';
import './components/Timer';
import './components/TextCrop';

export class Common {
  constructor() {
    this.init();
  }

  init() {
    objectFitImages();
    this.addClassIE();
    if (!Resp.isDesk) {
      this.showToolTipByFirstClick();
      this.appendFilterInCategory();
    }
  }

  addClassIE() {
    if (detectIE()) $body.addClass('is-ie');
  }

  showToolTipByFirstClick() {
    const toolTips = document.querySelectorAll('.js-mob-tooltips');

    for (const toolTip of toolTips) {
      const links = toolTip.children;

      for (const link of links) link.addEventListener('click', function(e) {
        if (this.classList.contains(css.active)) {
          return true;
        } else {
          e.preventDefault();
          this.classList.add(css.active);
        }
      });
    }
  }

  appendFilterInCategory() {
    const $filter = $('.page__side_category');

    $filter.prependTo('.category__inner');
  }
}

export default new Common();
