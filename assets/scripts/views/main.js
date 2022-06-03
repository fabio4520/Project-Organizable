import { Aside } from "./aside.js";

const Layout = (function () {
  const template = `
  <main class="main">
    ${Aside}
    <div class="js-content content">
    </div>
  </main>
  `;

  return {
    toString() {
      return template;
    },
    addListeners() {
      Aside.addListeners();
    },
  };
})();

export { Layout };