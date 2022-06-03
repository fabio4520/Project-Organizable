import { tokenKey } from "./assets/scripts/config.js";
import DOMHandler from "./assets/scripts/dom-handler.js";
import LoginPage from "./assets/scripts/views/login.js";
import { Layout } from "./assets/scripts/views/main.js";
// import STORE from "./scripts/store.js";

async function init() {
  try {
    const token = sessionStorage.getItem(tokenKey);

    if (!token) throw new Error();

    // await STORE.fetchTasks();
    DOMHandler.load(Layout);
  } catch (error) {
    console.log(error);
    sessionStorage.removeItem(tokenKey);
    DOMHandler.load(LoginPage);
  }
}

init();
