import { bindHandlers, executeEnhancers, makeEnhancers, makeHandlers } from './utils';

import search from './search';
import navLoggedIn from './navLoggedIn';
import subNavigation from './subNavigation';
import { mobileNavigationButton, mobileNavigationToggleGroup } from './mobileNavigation';
import toggleClass from './toggleClass';
import exampleSwitcher from './exampleSwitcher';
import linkDropdown from './linkDropdown';
import { addPaymentMethodDropdown, linkDropdownPaymentMethods } from './linkDropdownPaymentMethods';
import { collapsedParameter, childParameters } from './parameters';
import sidebar from './sidebar';

const handlers = makeHandlers([toggleClass, collapsedParameter, childParameters]);

const enhancers = makeEnhancers([
  search,
  navLoggedIn,
  subNavigation,
  mobileNavigationButton,
  mobileNavigationToggleGroup,
  sidebar,
  linkDropdown,
  linkDropdownPaymentMethods,
  exampleSwitcher,
]);

const main = () => {
  addPaymentMethodDropdown();
  bindHandlers(handlers);
  executeEnhancers(enhancers);
};

if (document.readyState !== 'loading') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}
