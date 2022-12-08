import { debounce } from 'lodash';
import { enhance } from './utils';

const NO_SCROLL_UTILITY_CLASS = 'u-no-scroll';
const VISIBLE_STATE_CLASS = 'is-visible';
const OPENED_STATE_CLASS = 'is-opened';
const MOBILE_NAV_BREAKPOINT = 980; // _variables.scss:19

export default enhance('mobile-navigation-button', () => {
  const navigationTrigger = document.querySelector('.js-toggle-mobile-nav');
  const mobileSidebar = document.querySelector('.js-mobile-sidebar');

  navigationTrigger.addEventListener('click', event => {
    event.preventDefault();
    mobileSidebar.classList.toggle(VISIBLE_STATE_CLASS);
    navigationTrigger.classList.toggle(OPENED_STATE_CLASS);
    document.documentElement.classList.toggle(NO_SCROLL_UTILITY_CLASS);
  });

  const allowScrollingOnDesktop = () => {
    const { documentElement } = document;
    const documentScrollBlocked = documentElement.classList.contains(NO_SCROLL_UTILITY_CLASS);

    if (documentScrollBlocked) {
      requestAnimationFrame(() => {
        const documentWidth = window.innerWidth;

        // If we're on desktop and the mobile nav was previously opened, close it.
        if (documentWidth > MOBILE_NAV_BREAKPOINT) {
          documentElement.classList.remove(NO_SCROLL_UTILITY_CLASS);
          mobileSidebar.classList.remove(VISIBLE_STATE_CLASS);
          navigationTrigger.classList.remove(OPENED_STATE_CLASS);
        }
      });
    }
  };

  window.addEventListener('resize', debounce(allowScrollingOnDesktop, 200));
});
