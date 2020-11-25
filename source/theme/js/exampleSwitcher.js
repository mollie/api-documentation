import { enhance } from './utils';

const DEFAULT_LANGUAGE = 'curl';

// Gets all the codeblocks present and hides all of them except the one from the argument
const hideCodeBlocks = language => {
  const codeBlocks = Array.from(document.querySelectorAll('[id^="request-"]'));
  codeBlocks.forEach(block => {
    const elementId = `request-${language.toLowerCase()}`;
    if (block.id !== elementId) {
      block.classList.add('is-hidden');
      block.setAttribute('aria-hidden', 'true');
    } else {
      block.classList.remove('is-hidden');
      block.setAttribute('aria-hidden', 'false');
    }
  });
};

export default enhance('example-switcher', element => {
  // Gets stored language if present
  const storedLanguage = localStorage.getItem('preferredLanguage');
  let language;
  if (storedLanguage && storedLanguage !== 'undefined') {
    language = storedLanguage;
  } else {
    language = DEFAULT_LANGUAGE;
  }
  let selectedLanguage = document.getElementById(`example-switch-${language}`);

  if (!selectedLanguage) {
    selectedLanguage = document.getElementById(`example-switch-${DEFAULT_LANGUAGE}`);
  }

  // Sets initial state: selected and language on switcher and hiding all other blocks
  selectedLanguage && selectedLanguage.classList.add('is-selected');
  hideCodeBlocks(language);

  // Adds onclick listeners to switches
  const exampleSwitches = Array.from(element.children);
  exampleSwitches.forEach(link => {
    const { id } = link;
    const language = id.replace('example-switch-', '');
    link.addEventListener('click', () => {
      // Removes selected status from others and adds it to clicked one
      exampleSwitches.forEach(selected => selected.classList.remove('is-selected'));
      link.classList.add('is-selected');
      // Hides all the blocks except the clicked one
      hideCodeBlocks(language);
      // Saves language to storage
      localStorage.setItem('preferredLanguage', language);
    });
  });
});
