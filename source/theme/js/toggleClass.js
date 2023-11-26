import { handle } from './utils';

export default handle('toggle-class', (element, event) => {
  const target = element.getAttribute('data-target');
  const toggleClass = element.getAttribute('data-toggle-class');

  if (!target) {
    // eslint-disable-next-line no-console
    console.warn(`No "data-target" found on ${element}.`);
    return;
  }

  if (!toggleClass) {
    // eslint-disable-next-line no-console
    console.warn(`No "data-toggle-class" found on ${element}.`);
    return;
  }

  [].forEach.call(document.querySelectorAll(target), (el) => el.classList.toggle(toggleClass));
  event.preventDefault();
});
