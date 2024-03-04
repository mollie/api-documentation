import { handle } from './utils';

export const collapsedParameter = handle('collapsed-parameter', (element) => {
  const descriptionContainer = element.parentElement.nextElementSibling;

  if (element.classList.contains('collapsed')) {
    element.innerHTML = element.dataset.hideLabel;
    descriptionContainer.classList.remove('collapsed');
    element.classList.remove('collapsed');
  } else {
    element.innerHTML = element.dataset.showLabel;
    descriptionContainer.classList.add('collapsed');
    element.classList.add('collapsed');
  }
});

export const childParameters = handle('child-parameters', (element) => {
  const buttonContainer = element.parentElement;

  if (!buttonContainer.classList.contains('active')) {
    element.innerHTML = element.dataset.hideLabel;
    buttonContainer.classList.add('active');
    buttonContainer.nextElementSibling.classList.add('active');
  } else {
    element.innerHTML = element.dataset.showLabel;
    buttonContainer.classList.remove('active');
    buttonContainer.nextElementSibling.classList.remove('active');
  }
});
