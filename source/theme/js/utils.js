/* eslint-disable no-console */

/*
 * https://hiddedevries.nl/en/blog/2015-04-03-progressive-enhancement-with-handlers-and-enhancers
 */

const argumentsToObject = (id, fn) => ({
  id,
  fn,
});

// Use this function to register a handler
export const handle = argumentsToObject;
export const enhance = argumentsToObject;

/**
 * This function converts an array of object to an object of { id: fn } pairs.
 * It does this with failsafe and duplicate key checking so we know when the
 * wrong arguments were received or when we try to pass in a duplicate key.
 */
const make = type => arr =>
  arr.reduce((carry, item) => {
    if (!item) {
      console.warn(`Argument supplied to ${type} function is undefined`);
      return carry;
    }

    if (carry[item.id]) {
      console.warn(`Duplicate ${type} with the identifier '${item.id}'`);
      return carry;
    }

    // eslint-disable-next-line no-param-reassign
    carry[item.id] = item.fn;
    return carry;
  }, {});

export const makeHandlers = make('handler');
export const makeEnhancers = make('enhancer');

// Use this function to install the registered enhancers
export const executeEnhancers = enhancers => {
  [].forEach.call(document.querySelectorAll('[data-enhancer]'), element => {
    const enhancerAttribute = element.getAttribute('data-enhancer');

    if (!enhancerAttribute) {
      return;
    }

    const enhancerIds = enhancerAttribute.split(' ');
    enhancerIds.forEach(id => {
      if (typeof enhancers[id] === 'function') {
        enhancers[id](element);
      } else {
        console.warn(`Unknown enhancer ${id} on ${element}.`);
      }
    });
  });
};

// Use this function to install the registered handlers
export const bindHandlers = handlers => {
  document.addEventListener('click', event => {
    const handlerAttribute = event.target && event.target.getAttribute('data-handler');

    if (!handlerAttribute) {
      return;
    }

    if (event.target.tagName === 'A' && (event.metaKey || event.ctrlKey || event.shiftKey)) {
      return;
    }

    const handlerIds = handlerAttribute.split(' ');
    handlerIds.forEach(id => {
      if (typeof handlers[id] === 'function') {
        handlers[id](event.target, event);
      } else {
        console.warn(`Unknown handler ${id} on ${event.target}.`);
      }
    });
  });
};
