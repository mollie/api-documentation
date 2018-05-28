import { enhance, handle } from "./utils";

const languageList = document.querySelector(".js-footer-language-list");
const ACTIVE_CLASS = "is-active";

const hidePopup = event => {
  const languageTrigger = document.querySelector(".js-footer-language-trigger");
  const VISIBLE_CLASS = "is-visible";

  if (
    (event.type === "click" && event.target !== languageTrigger) ||
    (event.type === "keydown" && event.keyCode === 27)
  ) {
    languageTrigger.classList.remove(VISIBLE_CLASS);
    languageList.classList.remove(VISIBLE_CLASS);
    languageList.blur();
    languageList.setAttribute("tabindex", "-1");
    document.body.removeEventListener("click", hidePopup);
  }
};

const toggleLinks = event => {
  const list = event.target.nextElementSibling;
  event.target.classList.toggle(ACTIVE_CLASS);
  list.classList.toggle(ACTIVE_CLASS);
};

export const languageSwitch = handle("language-switch", () => {
  languageList.removeAttribute("tabindex");
  languageList.focus();

  document.body.addEventListener("click", hidePopup);
  document.addEventListener("keydown", hidePopup);
});

export const footer = enhance("footer", element => {
  element.classList.add("is-enhanced");

  requestAnimationFrame(() => {
    if (window.innerWidth < 720) {
      [].forEach.call(document.querySelectorAll(".js-footer-heading"), heading => {
        console.log('heading', heading);
        heading.addEventListener("click", toggleLinks);
      });
    }
  });
});
