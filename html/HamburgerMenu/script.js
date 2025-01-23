document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector('.MenuButton');
  const menu = document.querySelector('.Menu');
  const overlay = document.querySelector('.Overlay');

  // メニューのトグル関数
  const toggleMenu = () => {
    menuButton.classList.toggle('active'); // バツ印に変える
    menu.classList.toggle('MenuIsOpen'); // メニューを表示
    overlay.classList.toggle('OverlayIsOpen'); // オーバーレイを表示

    // aria-pressedの切り替え
    const isPressed = menuButton.getAttribute('aria-pressed') === 'true';
    menuButton.setAttribute('aria-pressed', !isPressed);
  };

  // メニューボタン（ハンバーガーメニュー）をクリックしたとき
  menuButton.addEventListener('click', toggleMenu);
});
