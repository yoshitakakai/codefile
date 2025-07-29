class Modal {
  constructor({
    dialog = '',
    toggleTrigger = '',
  }) {
    
    // DOM要素
    this.dialog = document.querySelector(dialog);
    if (!this.dialog) return;
    this.toggleTriggers = document.querySelectorAll(toggleTrigger);
    this.body = document.body;
    this.focusableEls = this.dialog.querySelectorAll(
      'a[href], area[href], input:not([disabled]):not([type="hidden"]):not([aria-hidden]), select:not([disabled]):not([aria-hidden]), textarea:not([disabled]):not([aria-hidden]), button:not([disabled]):not([aria-hidden]), iframe, object, embed, [contenteditable], [tabindex]:not([tabindex^="-"])'
    );
    // フラグ
    this.isOpen = this.dialog.open;
    this.isAnimating = false;
  }
  
  // 初期化
  init() {
    this.toggleTriggers.forEach((trigger) => {
      trigger.addEventListener('click', this._toggle.bind(this));
    });
    this.dialog.addEventListener('click', (e) => {
      if (e.target === this.dialog) {
        this._toggle();
      }
    });
    this.dialog.addEventListener('keydown', this._handleKeyAction.bind(this));
  }
  
  // 破棄
  destroy() {
    this.toggleTriggers.forEach((trigger) => {
      trigger.removeEventListener('click', this._toggle.bind(this));
    });
    this.dialog.removeEventListener('click', (e) => {
      if (e.target === this.dialog) {
        this._toggle();
      }
    });
    this.dialog.removeEventListener('keydown', this._handleKeyAction.bind(this));
  }
  
  // 背面スクロール抑制
  _scrollFixed(boolean) {
    let scrollY;
    if (boolean) {
      scrollY = window.scrollY;
      this.body.style.position = 'fixed';
      this.body.style.top = `-${scrollY}px`;
    } else {
      scrollY = this.body.style.top;
      this.body.style.removeProperty('position');
      this.body.style.removeProperty('top');
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }
  
  // アニメーションの待機
  async _waitAnimation(target) {
    const animations = target.getAnimations();
    if (animations.length === 0) {
      return Promise.resolve();
    } else {
      await Promise.allSettled(animations.map((animation) => animation.finished));
    }
  }
  
  // キーボード操作
  _handleKeyAction(e) {
    const firstFocusableEl = this.focusableEls[0];
    const lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];
    switch (e.key) {
      case 'Tab':
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableEl) {
            e.preventDefault();
            lastFocusableEl.focus();
          }
        } else {
          if (document.activeElement === lastFocusableEl) {
            e.preventDefault();
            firstFocusableEl.focus();
          }
        }
        break;
      case 'Escape':
        e.preventDefault();
        this._toggle();
        break;
    }
  }
  
  // モーダルウィンドウの開閉
  async _toggle() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.isOpen = !this.isOpen;
    this._scrollFixed(this.isOpen);
  
    if (this.isOpen) {
      this.dialog.showModal();
      requestAnimationFrame(() => {
        requestAnimationFrame(async () => {
          this.dialog.classList.add('is-open');
          await this._waitAnimation(this.dialog);
          this.isAnimating = false;
        });
      });
    } else {
      this.dialog.classList.remove('is-open');
      await this._waitAnimation(this.dialog);
      this.dialog.close();
      this.isAnimating = false;
    }
  }
}
  
// クラスの実行
const modal = new Modal({
  dialog: '.js-modal',
  toggleTrigger: '.js-modal-toggle',
});
modal.init();
  