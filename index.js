import { tokenKey } from "./assets/scripts/config.js";
import DOMHandler from "./assets/scripts/dom-handler.js";
import STORE from "./assets/scripts/store.js";
import LoginPage from "./assets/scripts/views/login.js";
import { Layout } from "./assets/scripts/views/main.js";

async function init() {
  try {
    const token = sessionStorage.getItem(tokenKey);

    if (!token) throw new Error();

    await STORE.fetchBoards();
    DOMHandler.load(Layout);
  } catch (error) {
    console.log(error);
    sessionStorage.removeItem(tokenKey);
    DOMHandler.load(LoginPage);
  }
}
init();
