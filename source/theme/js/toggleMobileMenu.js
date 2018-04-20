import { handle } from "./utils";

export default handle("toggle-mobile-menu", element => {
  document.body.classList.toggle("mobile-menu-opened");
});
