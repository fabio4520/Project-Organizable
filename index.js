import { tokenKey } from "./assets/scripts/config.js";
import DOMHandler from "./assets/scripts/dom-handler.js";
// import { HomePage } from "./scripts/pages/home.js";
import LoginPage from "./assets/scripts/views/login.js";
// import STORE from "./scripts/store.js";

async function init() {
  try {
    const token = sessionStorage.getItem(tokenKey);

    if (!token) throw new Error();

    // await STORE.fetchTasks();
    // DOMHandler.load(HomePage);
  } catch (error) {
    console.log(error);
    sessionStorage.removeItem(tokenKey);
    DOMHandler.load(LoginPage);
  }
}

init();
