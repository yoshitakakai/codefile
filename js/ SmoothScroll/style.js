document.addEventListener('DOMContentLoaded', () => {
  const backToTopButton = document.querySelector('.back-to-top');

  // スクロール位置に応じてボタン表示
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      backToTopButton.style.visibility = 'visible';
      backToTopButton.style.opacity = '1';
    } else {
      backToTopButton.style.opacity = '0';
      backToTopButton.style.visibility = 'hidden';
    }
  });

  // スムーズにトップへ戻る
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
