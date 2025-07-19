
    document.addEventListener('DOMContentLoaded', function () {
      const toggle = document.querySelector('.menu-toggle');
      const menu = document.querySelector('.menu');

      toggle.addEventListener('click', function () {
        menu.classList.toggle('open');
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
      });

      function setupAccordionForMobile() {
        const isMobile = window.innerWidth < 769;
        const parents = document.querySelectorAll('.menu-item-has-children');

        parents.forEach(parent => {
          const link = parent.querySelector('a');
          const submenu = parent.querySelector('.sub-menu');
          const icon = parent.querySelector('.toggle-icon');

          // 初期化
          link.onclick = null;
          link.onkeydown = null;

          if (isMobile) {
            submenu.classList.remove('open');
            link.setAttribute('aria-expanded', 'false');
            if (icon) icon.textContent = '+';

            link.onclick = function (e) {
              e.preventDefault();
              const isOpen = submenu.classList.toggle('open');
              link.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
              if (icon) icon.textContent = isOpen ? '−' : '+';
            };

            link.onkeydown = function (e) {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isOpen = submenu.classList.toggle('open');
                link.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                if (icon) icon.textContent = isOpen ? '−' : '+';
              }
            };
          } else {
            submenu.classList.remove('open');
            link.setAttribute('aria-expanded', 'false');
            if (icon) icon.textContent = '';
          }
        });
      }

      setupAccordionForMobile();
      window.addEventListener('resize', setupAccordionForMobile);
    });
