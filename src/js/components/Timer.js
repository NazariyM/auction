class Timer {
  constructor(el) {
    this.block = (el);
    this.count = this.block.querySelectorAll('span');
    this.date = this.block.dataset.date;

    if (!this.block) return;

    this.init();
  }

  init() {
    this.timing();
  }

  timing() {
    const _this = this;
    const countDownDate = new Date(_this.date).getTime();

    const x = setInterval(function() {

      const now = new Date().getTime();

      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      _this.count[0].innerHTML = days + ' дней';
      _this.count[1].innerHTML = hours + ' ч';
      _this.count[2].innerHTML = minutes + ' м';

      if (_this.block.classList.contains('has-seconds')) {
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        _this.count[3].innerHTML = seconds + ' с';
      }

      if (distance < 0) {
        clearInterval(x);
        _this.block.innerHTML = 'время вышло';
      }

      _this.block.classList.add('is-init');
    }, 1000);
  }
}

const timers = document.querySelectorAll('.js-timer');
for (const timer of timers) new Timer(timer);
