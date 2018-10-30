import 'ion-rangeslider';

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

class RangeSliderDouble {
  constructor(el) {
    this.$block = $(el);
    this.$input = this.$block.find('.range-slider-double__input');
    this.$resultFrom = this.$block.find('.range-slider-double__result_from');
    this.$resultTo = this.$block.find('.range-slider-double__result_to');
    this.$minVal = this.$input.data('min-value');
    this.$maxVal = this.$input.data('max-value');
    this.$defaultFrom = this.$input.data('default-val-to');
    this.$defaultTo = this.$input.data('default-val-from');

    if (this.$block.length) this.init();
  }

  init() {
    this.createSlider();
  }

  createSlider() {
    const _this = this;

    this.$input.ionRangeSlider({
      type: 'double',
      min: _this.$minVal,
      max: _this.$maxVal,
      from: _this.$defaultFrom,
      to: _this.$defaultTo,
      onStart: (data) => {
        _this.$resultFrom.text(data.from_pretty);
        _this.$resultTo.text(data.to_pretty);
      },
      onChange: (data) => {
        _this.$resultFrom.text(data.from_pretty);
        _this.$resultTo.text(data.to_pretty);
      }
    });
  }
}

export default new RangeSliderDouble();

const $rs = $('.range-slider-double');
$rs.each((i, el) => new RangeSliderDouble(el));
