// import { loadContent } from "../utils.js";

import { currPage } from "../config.js";
import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import { listenLogout } from "../utils.js";

export const Aside = (function () {
  let a = STORE.currentPage
  console.log(STORE.currentPage);
  const template = `
  <aside class="aside">
    <ul>
      <li data-value="boards" class="
        ${a == "boards" ? "selected" : ""}
      " draggable="true">
        <i class="fa-solid fa-layer-group"></i>
        <a href="#notes">My Boards</a>
      </li>
      <li data-value="closed" class="${a == "closed" ? "selected" : ""}" draggable="true">
        <i class="fa-solid fa-xmark"></i>
        <a href="#trash">Closed Boards</a>
      </li>
      <li data-value="profile"  class="${a == "profile" ? "selected" : ""}" draggable="true">
        <i class="fa-solid fa-circle-user"></i>
        <a href="#trash">My Profile</a>
      </li>
    </ul>
    <button id="logout-btn" class="button is-danger is-light is-small">logout</button>
  </aside>
  `;

  function listenAsideClick() {
    const anchors = document.querySelectorAll(".aside a");
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        STORE.currentPage = anchor.closest("li").dataset.value;
        localStorage.setItem(currPage, STORE.currentPage)
        window.location.reload();
          return false
      });
    });
  }

  return {
    toString() {
      return template;
    },
    addListeners() {
      listenAsideClick(), listenLogout();
    },
  };
})();