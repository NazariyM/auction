import {
  throttle,
  detectIE,
  css,
  Resp
} from '../_helpers';

class Header {
  constructor() {
    this.body = document.querySelector('body');
    this.header = document.querySelector('.header');
    this.nav = this.header.querySelector('.nav');
    this.navBtn = this.header.querySelector('.nav-btn');
    this.controls = this.header.querySelector('.header__controls');
    this.controlsBtns = this.controls.querySelectorAll('.js-controls-btn');

    this.init();
  }

  init() {
    this.initFix();
    this.bindEvents();
  }

  bindEvents() {
    if (!Resp.isDesk) this.navBtn.addEventListener('click', () => this.toggleMenu());

    if (Resp.isDesk) {
      this.highlight($(this.nav).find('.nav__list'));
      this.highlight($(this.controls));
    }

    this.controlsEvents();
	 this.onResize();
  }

  onResize() {
    window.onresize = () => {
      this.navBtn.classList.remove(css.active);
      this.nav.classList.remove(css.active);
    };
  }

  toggleMenu() {
    this.navBtn.classList.toggle(css.active);
    this.nav.classList.toggle(css.active);
  }

  highlight(el) {
    const movingLine = {
      init: function init() {
        this.el = el;
        this.el.children().on('mouseover', this._move.bind(this));
        this.el.on('mouseleave', this._destroy.bind(this));

        this._goToActive();
      },
      _move: function _move(e) {
        const target = $(e.currentTarget);
        const $line = target.siblings('.moving-line');
        const width = target.width();
        const offsetLeft = target.position().left;
        const gutterLeft = parseInt(getComputedStyle(target[0]).paddingLeft);

        $line.css({
          width: width + 'px',
          transform: 'translate3d(' + (gutterLeft + offsetLeft) + 'px, 0, 0)'
        });
      },
      _destroy: function _destroy() {
        this._goToActive();
      },
      _goToActive: function _goToActive() {
        const line = this.el.find('.moving-line');
        const listItems = this.el.children();
        const gutterLeft = parseInt(getComputedStyle(listItems[0]).paddingLeft);

        const activeProp = {
          width: listItems.width(),
          offsetLeft: listItems.position().left
        };

        line.css({
          width: activeProp.width + 'px',
          transform: 'translate3d(' + (activeProp.offsetLeft + gutterLeft) + 'px, 0, 0)'
        });
      }
    };

    movingLine.init();
  }

  controlsEvents() {
    for (const btn of this.controlsBtns) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();

        const item = btn.parentNode;

        item.classList.contains(css.active) ? item.classList.remove(css.active) : item.classList.add(css.active);
      });
    }
  }

  initFix() {
    const _this = this;
    const toggleHeaderScroll = throttle((e) => {
      toggleHeader(e);
    }, 0, this);

    function toggleHeader(e) {
      if (window.pageYOffset > 0) {
        _this.header.classList.add(css.fixed);
      } else {
        _this.header.classList.remove(css.fixed);
      }
    }

    window.addEventListener('scroll', toggleHeaderScroll);
  }
}

export const HeaderAPI = new Header();
