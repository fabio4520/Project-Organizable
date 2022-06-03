import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import { Aside } from "./aside.js";
import { BoardsPage, renderBoards } from "./boards.js";

function renderMain() {
  const template = `
  
  <main class="main">
    <header class="header">
      <h1><img src="/assets/images/organizable.png" alt="Organizable" /></h1>
      <h2>Welcome to {organizable}</h2>
    </header>
    ${Aside}
    <div class="js-content content">
    ${BoardsPage}
    </div>
  </main>
  `;
  return template
}

const Layout =  {
  toString() {
    return renderMain();
  },
  addListeners() {
    Aside.addListeners();
    BoardsPage.addListeners();
  },
}

export { Layout };