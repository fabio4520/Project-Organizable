// import { loadContent } from "../utils.js";

import STORE from "../store.js";
import { listenLogout } from "../utils.js";

export const Aside = (function () {
  const template = `
  <aside class="aside">
    <ul>
      <li data-value="boards" class="selected" draggable="true">
        <i class="fa-solid fa-layer-group"></i>
        <a href="#notes">My Boards</a>
      </li>
      <li data-value="closed" draggable="true">
        <i class="fa-solid fa-xmark"></i>
        <a href="#trash">Closed Boards</a>
      </li>
      <li data-value="profile" draggable="true">
        <i class="fa-solid fa-circle-user"></i>
        <a href="#trash">My Profile</a>
      </li>
    </ul>
    <button id="logout-btn" class="button is-danger is-light is-small">logout</button>
  </aside>
  `;

  // anado y elimino la clase 'selected' dependiendo de si es notes o trash
  function setSelectedAsideItem() {
    const items = document.querySelectorAll(".aside li");
    const selectedItem = Array.from(items).find(
      (item) => item.dataset.value === STORE.currentSection
    );
    items.forEach((item) => item.classList.remove("selected"));
    selectedItem.classList.add("selected");
  }
  // selecciono todos los <a></a> de mi lista, luego prevengo su accion
  // extraigo si es data-value = 'notes' o 'trash' => STORE.currentSection
  // ejecuto la funcion de arriba.
  // cargo el contenido.
  function listenAsideClick() {
    const anchors = document.querySelectorAll(".aside a");
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        STORE.currentSection = anchor.closest("li").dataset.value;
        console.log(STORE.currentSection);
        setSelectedAsideItem();
        // loadContent();
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