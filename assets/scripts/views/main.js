import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import { Aside } from "./aside.js";
import { BoardsPage, renderBoards } from "./boards.js";
import { ClosedPage } from "./closed.js";
import { ProfilePage } from "./profile.js";

function renderMain() {
  const template = `
  
  <main class="main">
    <header class="header">
      <h1><img src="/assets/images/organizable.png" alt="Organizable" /></h1>
      <h2>Welcome to {organizable}</h2>
    </header>
    ${Aside}
    <div class="js-content content">
    ${renderContent(STORE.currentPage)}
    </div>
  </main>
  `;
  return template
}

function renderContent(currentPage) {
  console.log(currentPage);
  let page = {};
  switch (currentPage) {
    case "boards":
      page = BoardsPage
      break;
    case "closed":
      page = ClosedPage
      break;
    case "profile":
      page = ProfilePage
      break;
  
    default:
      break;
  }
  return page
}

const Layout =  {
  toString() {
    return renderMain();
  },
  addListeners() {
    Aside.addListeners();
    BoardsPage.addListeners();
    ClosedPage.addListeners();
    ProfilePage.addListeners();
  },
}

export { Layout };