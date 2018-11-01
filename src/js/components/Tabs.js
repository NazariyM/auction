import { TweenMax } from 'gsap';
import { css } from '../_helpers';

class Tabs {
  constructor(el) {
    this.$block = $('.tabs');
    this.$tabNav = el.find('.tabs__btn');
    this.$tabItemContainer = el.find('.tabs__for');
    this.$tabItem = this.$tabItemContainer.find('.tabs__tab');

    if (this.$block.length) this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    if (!this.$tabNav.hasClass('js-disabled') && this.getActiveIndex() !== 0) {
      this.$tabItem.hide().eq(this.getActiveIndex()).show();
    }

    this.$tabNav.on('click', (ev) => {
      const currentIndex = this.getActiveIndex();
      const targetIndex = $(ev.currentTarget).index();

      this.changeTab(currentIndex, targetIndex);
    });
  }

  getActiveIndex() {
    let activeIndex = 0;

    this.$tabNav.each(function () {
      if ($(this).hasClass(css.active)) {
        activeIndex = $(this).index();
      }
    });

    return activeIndex;
  }

  changeTab(currentIndex, nextIndex) {
    const _this = this;
    const speed = 0.25;
    const $currentTabNav = this.$tabNav.eq(currentIndex);
    const $nextTabNav = this.$tabNav.eq(nextIndex);
    const $currentTab = this.$tabItem.eq(currentIndex);
    const $nextTab = this.$tabItem.eq(nextIndex);

    $currentTabNav.removeClass(css.active);
    $nextTabNav.addClass(css.active);

    if (_this.$block.hasClass('is-anim')) {
      this.animate($currentTab, $nextTab, _this.$tabItemContainer, speed);
    } else {
      $currentTab.hide();
      $nextTab.show();
    }
  }

  animate($currentTab, $nextTab, container, speed) {
    TweenMax.to($currentTab, speed, {
      autoAlpha: 0,
      y: 30,
      clearProps: 'transform',
      onComplete() {
        const currentHeight = container.outerHeight();
        TweenMax.set(container, { height: currentHeight });
        $(this.target).hide();
        TweenMax.set($nextTab, { autoAlpha: 1 });
        $nextTab.show();

        TweenMax.staggerFromTo($nextTab.children().children(), speed, {
          autoAlpha: 0,
          y: 50
        }, {
          autoAlpha: 1,
          y: 0
        }, speed / 2);
        TweenMax.set(container, { height: 'auto' });
        TweenMax.from(container, speed, { height: currentHeight });
      }
    });
  }
}

/** tabs init */
const $tabs = $('.tabs');
$tabs.each((index, el) => {
  new Tabs($(el));
});

