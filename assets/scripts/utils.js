import DOMHandler from "./dom-handler.js";
import { logout } from "./services/session-services.js";
import LoginPage from "./views/login.js";

function renderToolTip() {
  return `
  <div class="tooltip">
    <input type="hidden" name="color" />
    <a class="tooltip-trigger" href="#color"><i class="ri-palette-fill"></i></a>
    <div class="tooltip-content hidden">
      <div class="tooltip-content__body">
        <div
          data-color="white"
          class="tooltip-option tooltip-option--white"
        ></div>
        <div data-color="red" class="tooltip-option tooltip-option--red"></div>
        <div
          data-color="orange"
          class="tooltip-option tooltip-option--orange"
        ></div>
        <div
          data-color="yellow"
          class="tooltip-option tooltip-option--yellow"
        ></div>
        <div
          data-color="green"
          class="tooltip-option tooltip-option--green"
        ></div>
        <div
          data-color="turquoise"
          class="tooltip-option tooltip-option--turquoise"
        ></div>
        <div data-color="cyan" class="tooltip-option tooltip-option--cyan"></div>
        <div data-color="blue" class="tooltip-option tooltip-option--blue"></div>
        <div
          data-color="purple"
          class="tooltip-option tooltip-option--purple"
        ></div>
        <div data-color="pink" class="tooltip-option tooltip-option--pink"></div>
      </div>
    </div>
  </div>
  `;
}

export function listenLogout() {
  const $logoutBtn = document.querySelector("#logout-btn");
  $logoutBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    await logout();
    setTimeout(function () {
      // loadingPage();
      setTimeout(() => {
        DOMHandler.load(LoginPage);
      }, 500);
    }, 500);
  });
}

export { renderToolTip };
