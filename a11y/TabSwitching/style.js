document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.getElementsByClassName("tab");
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener("click", tabSwitch);
    }
  
    function tabSwitch() {
      // タブのaria属性変更
      document
        .querySelector('.tab[aria-selected="true"]')
        .setAttribute("aria-selected", "false");
      this.setAttribute("aria-selected", true);
  
      // パネルのaria属性変更
      document
        .querySelector('.panel[aria-hidden="false"]')
        .setAttribute("aria-hidden", "true");
      const arrayTabs = Array.prototype.slice.call(tabs);
      const index = arrayTabs.indexOf(this);
      document
        .getElementsByClassName("panel")
        [index].setAttribute("aria-hidden", "false");
    }
  });