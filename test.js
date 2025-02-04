const $slider = document.querySelector('.js-slider');
const $slidePrev = document.querySelector('.js-slider-prev');
const $slideNext = document.querySelector('.js-slider-next');
const $slideAuto = document.querySelector('.js-slider-auto');
const slideItem = 'js-slider-item';
const currentClass = 'is-show';
const slideSpeed = 300;
const slideAuto = 3000;
let slideTimer;
let autoFlag = true;
// フォーカス可能な要素一覧
const focusableSelector = `
  a[href],
  button:not([disabled]),
  input:not([disabled]):not([type="hidden"]),
  textarea:not([disabled]),
  select:not([disabled]),
  summary,
  area[href]
`;

window.addEventListener('DOMContentLoaded', function() {
  slider_init();
  auto_slide();
  $slidePrev.addEventListener('click', prev_slide);
  $slideNext.addEventListener('click', next_slide);
  $slideAuto.addEventListener('click', auto_control);
  $slider.addEventListener('mouseover', stop_slide);
  $slider.addEventListener('mouseleave', auto_slide);
  $slider.addEventListener('focusin', stop_slide);
  $slider.addEventListener('focusout', auto_slide);
});

// スライダーの初期設定
function slider_init() {
  $slider.querySelectorAll('.'+slideItem).forEach(function(slide) {
    slide.setAttribute('aria-hidden', 'true');
    slide.querySelectorAll(focusableSelector).forEach(function(element) {
      element.setAttribute('tabindex', -1);
    });
  });
  $slider.querySelector('.'+slideItem+'.'+currentClass)
    .setAttribute('aria-hidden', 'false');
  $slider.querySelector('.'+slideItem+'.'+currentClass)
    .querySelectorAll(focusableSelector).forEach(function(element) {
      element.setAttribute('tabindex', 0);
    });
}

// 1つ前のスライドに移動する処理
function prev_slide() {
  const $slideItems = $slider.querySelectorAll('.'+slideItem);
  const currentIndex = Array.from($slideItems).findIndex(function(item) {
    return item.classList.contains(currentClass);
  });
  // スライド中の場合は処理を行わない(連打防止)
  if($slider.classList.contains('is-sliding')) return;
  // スライド状態監視用のclass付与
  $slider.classList.add('is-sliding');
  // 次に表示するスライドを設定してスライド処理開始
  const nextIndex = currentIndex > 0 ? currentIndex - 1 : $slideItems.length - 1;
  slider_slide(nextIndex);
}

// 1つ先のスライドに移動する処理
function next_slide() {
  const $slideItems = $slider.querySelectorAll('.'+slideItem);
  const currentIndex = Array.from($slideItems).findIndex(function(item) {
    return item.classList.contains(currentClass);
  });
  // スライド中の場合は処理を行わない(連打防止)
  if($slider.classList.contains('is-sliding')) return;
  // スライド状態監視用のclass付与
  $slider.classList.add('is-sliding');
  // 次に表示するスライドを設定してスライド処理開始
  const nextIndex = currentIndex < $slideItems.length - 1 ? currentIndex + 1 : 0;
  slider_slide(nextIndex);
}

// スライダーのスライド処理
function slider_slide(nextIndex) {
  // 現在のカレントの設定変更
  $slider.querySelector('.'+slideItem+'.'+currentClass)
    .setAttribute('aria-hidden', 'true');
  $slider.querySelector('.'+slideItem+'.'+currentClass)
    .querySelectorAll(focusableSelector).forEach(function(element) {
      element.setAttribute('tabindex', -1);
    });
  $slider.querySelector('.'+slideItem+'.'+currentClass)
    .classList.remove(currentClass);
  // 次のカレントの設定変更
  $slider.querySelectorAll('.'+slideItem)[nextIndex]
    .classList.add(currentClass);
  $slider.querySelectorAll('.'+slideItem)[nextIndex]
    .setAttribute('aria-hidden', 'false');
  $slider.querySelectorAll('.'+slideItem)[nextIndex]
    .querySelectorAll(focusableSelector).forEach(function(element) {
      element.setAttribute('tabindex', 0);
    });
  // フェードのアニメーション終了後
  setTimeout(function() {
    // スライド状態監視用のclass除去
    $slider.classList.remove('is-sliding');
    // 自動スライドのタイマー設定
    auto_slide();
  }, slideSpeed);
}

// 自動スライドのタイマー設定
function auto_slide() {
  if(autoFlag) {
    clearTimeout(slideTimer);
    slideTimer = setTimeout(next_slide, slideAuto);
  }
}

// 自動スライド停止
function stop_slide() {
  clearTimeout(slideTimer);
}

// 自動スライドのコントロールクリック時の動作
function auto_control() {
  if(autoFlag) {
    autoFlag = false;
    $slideAuto.textContent = 'Start';
    stop_slide();
  } else {
    autoFlag = true;
    $slideAuto.textContent = 'Stop';
    auto_slide();
  }
}