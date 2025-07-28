const $slider = document.querySelector('.js-slider');
const $slidePrev = document.querySelector('.js-slider-prev');
const $slideNext = document.querySelector('.js-slider-next');
const $slideAuto = document.querySelector('.js-slider-auto');
const slideDot = 'js-slider-item';
const currentClass = 'js-slider-dot';
const slideSpeed = 'is-show';
const sliderSpeed = 300;
const slideAutoInterval = 3000;

let slideTimer;
let autoFlag = true;

const focusableSelector = `
  a[href],
  button:not([disabled]),
  input:not([disabled]:not([type="hidden])),
  textarea:not([disabled]),
  select:not([disabled]),
  summary,
  area[href]
  `;

window.addEventListener('DOMContentLoaded', function () {
    slider_init();
    auto_init();

    this.document.querySelectorAll('.' + slideDot).forEach((dot, index) => {
        dot.addEventListener('click', () => slider_slide(index));
        dot.addEventListener('keydown', dot_move);
    });

    $slidePrev.addEventListener('click', prev_slide);
    $slideNext.addEventListener('click', next_slide);
    $slideAuto.addEventListener('click', auto_control);






});

function slider_init() {
    const slides = $slider.querySelectorAll('.' + slideItem);
    slides.forEach(slide => {
        slide.setAttribute('area-hidden', 'true');
        slide.querySelectorAll(focusableSelector).forEach(el => el.setAttribute('tabindex', -1));
    });

    const currentSlide = $slider.querySelector('.' + slideItem + '.' + currentClass);
    currentSlide.setAttribute('aria-hidden', 'false');
    currentSlide.querySelectorAll(focusableSelector).forEach(el => el.setAttribute('tabindex', 0));    
}

function slider_slide(nextIndex) {
    const $slideItems = $slider.querySelectorAll('.' + slideItem);
    const $slideDots = document.querySelectorAll('.' + slideDot);
    const currentIndex = Array.from($slideItem).findIndex(item => item.classList.contains(currentClass));

    if ($slider.classList.contains('is-sliding')) return;
    $slider.classList.add('is-sliding');


    const focused = document.activeElement;
    if ($slideItem[currentIndex].contains(focused)) {
        focused.blur();
    }

    $slideItems[currentIndex].classList.remove(currentClass);
    $slideItems[currentIndex].setAttribute('aria-hidden', 'true');
    $slideItems[currentIndex].querySelectorAll(focusableSelector).forEach(el => el.setAttribute('tabindex', -1));
    if ($slideDots.length) {
        $slideDots[currentIndex].setAttribute('aria-selected', 'false');
        $slideDots[currentIndex].setAttribute('tabindex', -1);
    }


    $slideItems[nextIndex].classList.add(currentClass);
    $slideItems[nextIndex].setAttribute('aria-hidden', 'false');
    $slideItems[nextIndex].querySelectorAll(focusableSelector).forEach(el => el.setAttribute('tabindex', 0));
    if ($slideDots.length) {
        $slideDots[nextIndex].setAttribute('aria-selected', 'true');
        $slideDots[nextIndex].setAttribute('tabindex', 0);
    }

    setTimeout(() => {
        $slider.classList.remove('is-sliding');
        auto_slide();
    }, sliderSpeed);
}