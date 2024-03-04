import { enhance } from './utils';

export default enhance('nav-logged-in', (element) => {
  if (document.cookie.indexOf('mollieId') < 0) {
    return;
  }

  const loginLink = element.querySelector('.js-login-nav-link');

  if (loginLink) {
    loginLink.classList.add('is-hidden');
  }

  const signupLink = element.querySelector('.js-signup-nav-link');

  if (signupLink) {
    signupLink.classList.add('is-hidden');
  }

  const dashboardLink = element.querySelector('.js-dashboard-nav-link');

  if (dashboardLink) {
    dashboardLink.classList.remove('is-hidden');
  }
});
