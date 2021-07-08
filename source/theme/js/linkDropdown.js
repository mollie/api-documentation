import { enhance } from './utils';
import Dropkick from 'dropkickjs';

export default enhance('link-dropdown', (element) => {
  element.addEventListener('change', () => {
    window.location = element.value;
  });

  if (element.classList.contains('js-link-dropdown-dropkick')) {
    new Dropkick(element, {
      mobile: false,
    });
  }
});
