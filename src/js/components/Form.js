import 'ion-rangeslider';
import 'select2';

// checkboxes
class ChecbkoxGroup {
  constructor(el) {
    this.block = (el);
    this.checkBoxes = this.block.querySelectorAll('.js-checkbox');
    this.checkBoxAll = this.block.querySelector('.js-checkbox-all');

    if (!this.block) return;

    this.init();
  }

  init() {
    this.checkAll();
    this.checkBoxAll.addEventListener('change', this.checkAll.bind(this));
  }

  checkAll() {
    if (this.checkBoxAll.checked === true) for (const checkBox of this.checkBoxes) checkBox.checked = true;
    if (this.checkBoxAll.checked === false) for (const checkBox of this.checkBoxes) checkBox.checked = false;
  }
}

const checkBoxGroups = document.querySelectorAll('.checkbox-group');
for (const group of checkBoxGroups) new ChecbkoxGroup(group);


// range slider
class RangeSlider {
  constructor(el, defaultRange = false) {
    this.$block = $(el);
    this.defaultRange = defaultRange;

    this.$input = this.$block.find('.range-slider__input').find('input');
    this.$minVal = this.$input.data('min-value');
    this.$maxVal = this.$input.data('max-value');
    this.$defaultFrom = this.$input.data('default-val-from');

    this.$step = this.$input.data('step');

    if (!this.defaultRange) {
      this.$resultFrom = this.$block.find('.range-slider__result_from');
      this.$resultTo = this.$block.find('.range-slider__result_to');
      this.$defaultTo = this.$input.data('default-val-to');
    }

    if (this.$block.length) this.init();
  }

  init() {
    this.createSlider();
  }

  createSlider() {
    this.$input.ionRangeSlider({
      type: this.defaultRange ? 'single' : 'double',
      min: this.$minVal,
      max: this.$maxVal,
      from: this.$defaultFrom,
      to: this.$defaultTo,
      step: this.$step,
      onStart: (data) => {
        if (!this.defaultRange) {
          this.$resultFrom.text(data.from_pretty);
          this.$resultTo.text(data.to_pretty);
        }
      },
      onChange: (data) => {
        if (!this.defaultRange) {
          this.$resultFrom.text(data.from_pretty);
          this.$resultTo.text(data.to_pretty);
        }
      }
    });
  }
}

$('.js-range-slider-default').each((i, el) => new RangeSlider(el, true));
$('.js-range-slider').each((i, el) => new RangeSlider(el));

// select
const $select = $('.js-select');
$select.select2({
  minimumResultsForSearch: -1,
  width: '218px'
});
