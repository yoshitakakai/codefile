const $slider = document.querySelector('.js-slider');
const $slidePrev = document.querySelector('.js-slider-prev');
const $slideNext = document.querySelector('.js-slider-next');
const $slideAuto = document.querySelector('.js-slider-auto');
const slideItem = 'js-slider-item';
const slideDot = 'js-slider-dot';
const currentClass = 'is-show';
const slideSpeed = 300;
const slideAutoInterval = 3000;

let slideTimer;
let autoFlag = true;

const focusableSelector = `
  a[href],
  button:not([disabled]),
  input:not([disabled]):not([type="hidden"]),
  textarea:not([disabled]),
  select:not([disabled]),
  summary,
  area[href]
`;

window.addEventListener('DOMContentLoaded', function () {
  slider_init();
  auto_slide();

  document.querySelectorAll('.' + slideDot).forEach((dot, index) => {
    dot.addEventListener('click', () => slider_slide(index));
    dot.addEventListener('keydown', dot_move);
  });

  $slidePrev.addEventListener('click', prev_slide);
  $slideNext.addEventListener('click', next_slide);
  $slideAuto.addEventListener('click', auto_control);

  // mouse・キーボード（フォーカス）操作中にスライドを止める
  //$slider.addEventListener('mouseover', stop_slide);
  //$slider.addEventListener('mouseleave', auto_slide);
  //$slider.addEventListener('focusin', stop_slide);
  //$slider.addEventListener('focusout', auto_slide);
});

function slider_init() {
  const slides = $slider.querySelectorAll('.' + slideItem);
  slides.forEach(slide => {
    slide.setAttribute('aria-hidden', 'true');
    slide.querySelectorAll(focusableSelector).forEach(el => el.setAttribute('tabindex', -1));
  });

  const currentSlide = $slider.querySelector('.' + slideItem + '.' + currentClass);
  currentSlide.setAttribute('aria-hidden', 'false');
  currentSlide.querySelectorAll(focusableSelector).forEach(el => el.setAttribute('tabindex', 0));
}

function slider_slide(nextIndex) {
  const $slideItems = $slider.querySelectorAll('.' + slideItem);
  const $slideDots = document.querySelectorAll('.' + slideDot);
  const currentIndex = Array.from($slideItems).findIndex(item => item.classList.contains(currentClass));

  if ($slider.classList.contains('is-sliding')) return;
  $slider.classList.add('is-sliding');

  // Remove current
  const focused = document.activeElement;
  if ($slideItems[currentIndex].contains(focused)) {
    focused.blur(); // ←★これでフォーカスを外す
  }
  $slideItems[currentIndex].classList.remove(currentClass);
  $slideItems[currentIndex].setAttribute('aria-hidden', 'true');
  $slideItems[currentIndex].querySelectorAll(focusableSelector).forEach(el => el.setAttribute('tabindex', -1));
  if ($slideDots.length) {
    $slideDots[currentIndex].setAttribute('aria-selected', 'false');
    $slideDots[currentIndex].setAttribute('tabindex', -1);
  }

  // Add new
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
  }, slideSpeed);
}

function prev_slide() {
  const slides = $slider.querySelectorAll('.' + slideItem);
  const currentIndex = Array.from(slides).findIndex(item => item.classList.contains(currentClass));
  const nextIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
  slider_slide(nextIndex);
}

function next_slide() {
  const slides = $slider.querySelectorAll('.' + slideItem);
  const currentIndex = Array.from(slides).findIndex(item => item.classList.contains(currentClass));
  const nextIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
  slider_slide(nextIndex);
}

function auto_slide() {
  if (autoFlag) {
    clearTimeout(slideTimer);
    slideTimer = setTimeout(next_slide, slideAutoInterval);
  }
}

function stop_slide() {
  clearTimeout(slideTimer);
}

function auto_control() {
  autoFlag = !autoFlag;
  $slideAuto.textContent = autoFlag ? 'Stop' : 'Start';
  if (autoFlag) auto_slide();
  else stop_slide();
}

function dot_move(e) {
  const dots = document.querySelectorAll('.' + slideDot);
  const currentIndex = Array.from(dots).findIndex(dot => dot === e.currentTarget);
  let nextIndex = currentIndex;

  if (e.key === 'ArrowLeft') {
    nextIndex = currentIndex > 0 ? currentIndex - 1 : dots.length - 1;
  } else if (e.key === 'ArrowRight') {
    nextIndex = currentIndex < dots.length - 1 ? currentIndex + 1 : 0;
  } else if (e.key === 'Home') {
    nextIndex = 0;
  } else if (e.key === 'End') {
    nextIndex = dots.length - 1;
  } else {
    return;
  }

  dots[nextIndex].focus();
  slider_slide(nextIndex);
  e.preventDefault();
}
