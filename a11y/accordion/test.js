class Modal {
    constructor({
        dialog = "",
        toggleTrigger = "",
        mainContent = ["main"]
    }) {
        this.dialog = document.querySelector(dialog);
        if (!this.dialog) return;
        this.toggleTrigger = document.querySelectorAll(toggleTrigger);
        this.body = document.body;
        this.main = mainContent.map((selector) =>document.querySelector(selector));
        this.focusableEls = this.dialog.querySelectorAll(
            'a[href], area[href], input:not([disabled]):not([type="hidden"]):not([aria-hidden]), select:not([disabled]):not([area-hidden]), textarea:not([disabled]):not([area-hidden]), button:not([disabled]):not([area-hidden]), iframe, object, embed, [contenteditable], [tabindex]:not([tabindex^="-"])'
        );
        this.lastFocusedEl = null;
        this.isOpen = this.dialog.classList.contains("is-open");
        this.isAnimation = false;
    }

    init() {
        this.toggleTrigger.forEach((trigger) => {
            trigger.addEventListener("click", this._toggle.bind(this));
        });
        this.dialog.addEventListener("click", (e) => {
            if (e.target === this.dialog) {
                this._toggle();
            }
        });
        this.dialog.addEventListener("keydown", this._handleKeyAction.bind(this));
    }

    destroy() {
        this.toggleTrigger.forEach((trigger) => {
            trigger.removeEventListener("click", this._toggle.bind(this));
        });
        this.dialog.removeEventListener("click", (e) => {
            if (e.target === this.dialog) {
                this._toggle();
            }
        });
        this.dialog.removeEventListener(
            "keydown",
            this._handleKeyAction.bind(this)
        );
        if (this.lastFocusedEl) this.lastFocusedEl = null;
    }

    _scrollFixed(boolean) {
        let scrollY;
        if (boolean) {
            scrollY = window.screenY;
            this.body.style.position = "fixed";
            this.body.style.top = `-${scrollY}px`;
        } else {
            scrollY = this.body.style.top;
            this.body.style.removeProperty("position");
            this.body.style.removeProperty("top");
            window.scrollTo(0, parseInt(scrollY || "0") * -1);
        }
    }

    // アニメーションの待機
    async _waitAnimation(target) {
        const animations = target.getAnimations();
        if (animations.length === 0) {

        } else {
            await Promise.allSettled(
                animations.map((animation) => animation.finished)
            );
        }
    }

    _handleKeyAction(e) {
        const firstFocusableEl = this.focusableEls[0];
        const lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];
        switch (e.key) {
            case "Tab":
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
            case "Escape":
            e.preventDefault();
            this._toggle();
            break;
        }
    }

    async _toggle() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.isOpen = !this.isOpen;
        this.dialog.classList.toggle("is-open", this.isOpen);
        this.main.forEach((el) => {
            el && (el.inert = this.isOpen);
        });
        this._scrollFixed(this.isOpen);

        if (this.isOpen) {
            this.lastFocusedEl = document.activeElement;
            await this._waitAnimation(this.dialog);
            this.focusableEls[0].focus();
            this.isAnimating = false;
        } else {
            this.lastFocusedEl.focus();
            await this._waitAnimation(this.dialog);
            this.lastFocusedEl = null;
            this.isAnimating = false;
        }
    }
}

const modal  = new Modal({
    dialog: ".js-modal",
    toggleTrigger: ".js-modal-toggle",
})