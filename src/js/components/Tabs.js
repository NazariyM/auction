import { TweenMax } from 'gsap';
import { css } from '../_helpers';

class Tabs {
  constructor(el) {
    this.$tabs = $(el);
    this.$tabsNavBtn = this.$tabs.find('.js-tabs-nav').children();
    this.$tabsItemContainer = this.$tabs.find('.js-tabs-for');
    this.$tabsItem = this.$tabsItemContainer.children();

    if (this.$tabs.length) this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    if (!this.$tabsNavBtn.hasClass('js-disabled') && this.getActiveIndex() !== 0) {
      this.$tabsItem.hide().eq(this.getActiveIndex()).show();
    }

    this.$tabsNavBtn.on('click', (ev) => {
      const currentIndex = this.getActiveIndex();
      const targetIndex = $(ev.currentTarget).index();

      this.changeTab(currentIndex, targetIndex);
    });
  }

  getActiveIndex() {
    let activeIndex = 0;

    this.$tabsNavBtn.each(function() {
      if ($(this).hasClass(css.active)) {
        activeIndex = $(this).index();
      }
    });

    return activeIndex;
  }

  changeTab(currentIndex, nextIndex) {
    const _this = this;
    const speed = 0.25;
    const $currentTabNav = this.$tabsNavBtn.eq(currentIndex);
    const $nextTabNav = this.$tabsNavBtn.eq(nextIndex);
    const $currentTab = this.$tabsItem.eq(currentIndex);
    const $nextTab = this.$tabsItem.eq(nextIndex);

    $currentTabNav.removeClass(css.active);
    $nextTabNav.addClass(css.active);

    if (_this.$tabs.hasClass('is-anim')) {
      this.animate($currentTab, $nextTab, _this.$tabsItemContainer, speed);
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
const $tabs = $('.js-tabs');
$tabs.each((index, el) => new Tabs(el));

