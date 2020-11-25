import { enhance } from './utils';
import Dropkick from 'dropkickjs';

const DEFAULT_METHOD = 'bank-transfer';

// Adds the onchange listener that hides/shows methods based on selection
export const linkDropdownPaymentMethods = enhance('payment-method-switcher', element => {
  element.addEventListener('change', () => {
    element.childNodes.forEach(method => {
      const selectedElement = document.getElementById(method.value);
      if (method.value !== element.value) {
        selectedElement.classList.add('u-screenreader-only');
        selectedElement.setAttribute('aria-hidden', 'true');
      } else {
        selectedElement.classList.remove('u-screenreader-only');
        selectedElement.setAttribute('aria-hidden', 'false');
        localStorage.setItem('preferredPaymentMethod', method.value);
      }
    });
  });
  // Initializes the select element we created
  new Dropkick(element, {
    mobile: false,
  });
});

// Adds the payment method dropdown to the DOM
// We need to do this with JS, as the doc file is compiled from the .rst files
export const addPaymentMethodDropdown = () => {
  //Gets all possible payment methods and the preferred one from storage

  // We need to get the payment methods block (different names in different pages, same prefix)
  const paymentMethods = document.querySelectorAll('[id^=payment-method-specific]');

  if (paymentMethods.length) {
    const paymentMethodsBlock = paymentMethods[0];
    const paymentMethodsBlockArray = Array.from(paymentMethodsBlock.childNodes);

    // Get the prefered method, from hash, storage or the default one.
    const storedMethod = localStorage.getItem('preferredPaymentMethod');
    const hashMethod = window.location.hash && window.location.hash.replace('#', '');

    let preferredMethod;

    if (hashMethod && paymentMethodsBlockArray.some(m => m.id === hashMethod)) {
      preferredMethod = hashMethod;
    } else if (storedMethod && storedMethod !== 'undefined') {
      preferredMethod = storedMethod;
    } else {
      preferredMethod = DEFAULT_METHOD;
    }

    let options = '';
    let firstMethod;
    paymentMethodsBlockArray.forEach(method => {
      // Adds the selector option for each method (use classic for loop for IE11)
      // Inside the block, we are interested in the divs, not the title nor the description
      if (method.nodeName !== 'DIV') {
        return;
      }
      // We save the first payment method to append the dropdown to it later.
      if (!firstMethod) {
        firstMethod = method;
      }
      // Defined which one is selected && hide the rest
      const isSelected = method.id === preferredMethod;
      if (!isSelected) {
        method.classList.add('u-screenreader-only');
        method.setAttribute('aria-hidden', 'true');
      }
      // We need the payment method title to display it in the options
      const methodTitle = method.getElementsByTagName('H4');
      if (methodTitle.length) {
        const methodName = methodTitle[0].textContent.replace('¶', '');
        // Build the options, with their names and if they are selected or not
        options += `<option value="${method.id}" ${
          isSelected ? ' selected' : ''
        }>${methodName}</option>`;
      }
    });
    // We build the element and add it to the DOM
    const dropdown = document.createElement('select');
    // Adds attributes
    dropdown.setAttribute('data-enhancer', 'payment-method-switcher');
    dropdown.classList.add('link-dropdown', 'payment-methods');
    // Adds the options we generated before
    dropdown.innerHTML = options;
    // Adds it after the title and description, before the first method
    paymentMethodsBlock.insertBefore(dropdown, firstMethod);
  }
};
