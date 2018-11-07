import 'slick-carousel';
import { svgIcon } from '../_helpers';

class Slider {
  constructor({ el= '.js-slider', slidesToShow = 1, slidesToScroll = 1, ...opts } = {}) {
    this.$slider = $(el);
    this.slidesToShow = slidesToShow;
    this.slidesToScroll = slidesToScroll;
    this.responsive = opts.responsive;
    this.arrows = opts.arrows || false;
    this.infinite = opts.infinite || false;
    this.function = opts.function || false;
    this.dots = opts.dots || false;
    this.dotsClass = opts.dotsClass || 'slider-dots';
    this.appendArrows = opts.appendArrows;
    this.appendDots = opts.appendDots;
    this.speed = opts.speed || 600;
    this.ease = opts.ease;
    this.counter = opts.counter || false;
    this.onInit = opts.onInit || false;
    this.adaptiveHeight = opts.adaptiveHeight || false;

    const iconLeft = '<div class="icon icon-sld-arr-l"></div>';
    const iconRight = '<div class="icon icon-sld-arr-r"></div>';

    this.defaultOptions = {
      slidesToShow: this.slidesToShow,
      slidesToScroll: this.slidesToScroll,
      infinite: this.infinite,
      speed: this.speed,
      useTransform: true,
      adaptiveHeight: this.adaptiveHeight,
      accessibility: false,
      swipe: true,
      arrows: this.arrows,
      prevArrow: `<button type="button" class="slider-btn slider-btn_prev">${iconLeft}</button>`,
      nextArrow: `<button type="button" class="slider-btn slider-btn_next">${iconRight}</button>`,
      dots: this.dots,
      dotsClass: this.dotsClass,
      appendArrows: this.appendArrows,
      appendDots: this.appendDots,
      rows: 0,
      responsive: this.responsive,
      cssEase: this.ease
    };

    if (this.$slider.length) this.init();
  }

  init() {
    this.initSlider();
  }

  initSlider() {
    this.$slider.slick($.extend({}, this.defaultOptions));
  }
}

export default new Slider();

const infoBlockSld = new Slider({
  el: '.info-block__slider',
  slidesToShow: 3,
  ease: 'cubic-bezier(0.74, 0.1, 0.32, 0.98)',
  arrows: true,
  infinite: true,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1
      }
    }
  ]
});

const partnersSld = new Slider({
  el: '.partners__slider',
  slidesToShow: 5,
  ease: 'cubic-bezier(0.74, 0.1, 0.32, 0.98)',
  arrows: true,
  infinite: true,
  responsive: [
    {
      breakpoint: 1250,
      settings: {
        slidesToShow: 4
      }
    }, {
      breakpoint: 767,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 424,
      settings: {
        slidesToShow: 1
      }
    }
  ]
});

class View {
  constructor(el) {
    this.$container = $(el);
    this.$nav = $(this.$container.children()[0]);
    this.$block = $(this.$container.children()[1]);

    if (this.$container.length) this.init();
  }

  init() {
    this.createSliders();
  }

  createSliders() {
    this.$nav.slick({
      asNavFor: this.$block,
      speed: 400,
      slidesToShow: 5,
      rows: 0,
      arrows: false,
      focusOnSelect: true,
      vertical: true,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 4,
            vertical: false
          }
        }
      ]
    });

    this.$block.slick({
      asNavFor: this.$nav,
      rows: 0,
      arrows: false,
      speed: 400
    });
  }
}

$('.view').each((i, el) => new View(el));
