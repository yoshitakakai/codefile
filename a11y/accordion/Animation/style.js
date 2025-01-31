class Accordion {
  constructor(el) {
    // DOM要素
    this.details = el;
    if (!this.details) return;
    this.trigger = null;
    this.panel = null;
    // インスタンス
    this.observer = null;
    // フラグ
    this.isOpen = null;
    this.isAnimating = false;
  }

  // 初期化
  init() {
    this.trigger = this.details.querySelector("summary");
    this.panel = this.trigger.nextElementSibling;
    this.isOpen = this.details.open;

    this.panel.style.height = this.isOpen ? "" : "0";
    this._observeHidden();
    this.trigger.addEventListener("click", this._toggle.bind(this));
  }

  // 破棄
  destroy() {
    if (this.trigger) {
      this.trigger.removeEventListener("click", this._toggle.bind(this));
      this.trigger = null;
    }
    if (this.panel) {
      this.panel = null;
    }
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  // アニメーションの待機
  async _waitAnimation(target) {
    const animations = target.getAnimations();
    if (animations.length === 0) {
      return Promise.resolve();
    } else {
      await Promise.allSettled(
        animations.map((animation) => animation.finished)
      );
    }
  }

  // アコーディオンの開閉
  async _toggle(e) {
    e.preventDefault();
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.isOpen = !this.isOpen;
    this.details.classList.toggle("is-open", this.isOpen);

    if (this.isOpen) {
      this.details.open = true;
      this.panel.style.height = `${this.panel.scrollHeight}px`;
      await this._waitAnimation(this.panel);
      this.panel.style.height = "auto";
      this.isAnimating = false;
    } else {
      this.panel.style.height = `${this.panel.scrollHeight}px`;
      requestAnimationFrame(() => {
        requestAnimationFrame(async () => {
          this.panel.style.height = "0";
          await this._waitAnimation(this.panel);
          this.details.open = false;
          this.isAnimating = false;
        });
      });
    }
  }

  // open属性の監視（ページ内検索用）
  _observeHidden() {
    this.observer = new MutationObserver(() => {
      if (this.isAnimating) return;
      this.isOpen = this.details.open;
      this.details.classList.toggle("is-open", this.isOpen);
      this.panel.style.height = this.isOpen ? "auto" : "0";
    });

    this.observer.observe(this.details, {
      attributes: true,
      attributeFilter: ["open"]
    });
  }
}

// クラスの実行
const elements = document.querySelectorAll(".js-accordion");

elements.forEach((el) => {
  const accordion = new Accordion(el);
  accordion.init();
});