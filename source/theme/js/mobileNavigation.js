import { handle } from './utils';

// Define properties
const nav = document.querySelector('.js-main-navigation');
const NOSCROLL_CLASS = 'no-scroll';
const OPEN_CLASS = 'is-open';
let scrollPosition = 0;
let isOpen = false;

// Create function
const close = () => {
  document.body.classList.remove(NOSCROLL_CLASS);
  nav.classList.remove(OPEN_CLASS);
  document.body.scrollTop = scrollPosition;
  // This line is needed for IE11
  document.body.parentNode.scrollTop = scrollPosition;
  // This line is needed for Firefox because it doesn't scroll the document.body.
  // And we can't remove the line above because although Safari and Chrome recognize
  // the document.documentElement they are unable to scroll it.
  document.documentElement.scrollTop = scrollPosition;
  isOpen = false;
};

const open = () => {
  scrollPosition = window.pageYOffset;
  document.body.classList.add(NOSCROLL_CLASS);
  nav.classList.add(OPEN_CLASS);
  isOpen = true;
};

// Trigger
const toggle = handle('toggle-nav', (element, event) => {
  if (isOpen) {
    close();
  } else {
    open();
  }
  if (event) {
    event.preventDefault();
  }
});

export default toggle;
