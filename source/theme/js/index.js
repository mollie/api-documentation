import { bindHandlers, executeEnhancers, makeEnhancers, makeHandlers } from "./utils";

import toggleMobileMenu from "./toggleMobileMenu";

const handlers = makeHandlers([toggleMobileMenu]);

const enhancers = makeEnhancers([]);

const main = () => {
  bindHandlers(handlers);
  executeEnhancers(enhancers);
};

if (document.readyState !== "loading") {
  main();
} else {
  document.addEventListener("DOMContentLoaded", main);
}
