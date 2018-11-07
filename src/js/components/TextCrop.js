import 'jquery.dotdotdot';
import { $window, throttle } from '../_helpers';

export class TextCrop {
  constructor(el) {
    this.$block = $(el);

    this.init();
  }

  init() {
    $window.on('load', () => {
      this.initDot();
      this.onResize();
    });
  }

  onResize() {
    const reinitDot = throttle(() => {
      this.destroy();
      this.initDot();
    }, 250, this);

    $window.on('resize orientationchange', reinitDot);
  }

  initDot() {
    this.$block.dotdotdot();
    this.API = this.$block.data('dotdotdot');
  }

  destroy() {
    this.API.restore();
  }
}

$('.js-dot').each((i, el) => {
  new TextCrop(el);
});
