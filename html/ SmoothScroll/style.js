const backToTopButton = document.querySelector('.back-to-top');

// ページがスクロールされた際にボタンをフェードイン・フェードアウトする処理
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        backToTopButton.style.visibility = 'visible';
        backToTopButton.style.opacity = '1';
      } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
      }
});

function scrollToTop() {
    const duration = 100;
    const interval = 15;
    const step = window.scrollY / (duration / interval);

    const scrollInterval = setInterval(() => {
        if (window.scrollY <= 0) {
          clearInterval(scrollInterval);
        } else {
          window.scrollBy(0, -step);
        }
    }, interval );
}