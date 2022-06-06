import { currBoard, currPage, currUser, tokenKey } from "./assets/scripts/config.js";
import DOMHandler from "./assets/scripts/dom-handler.js";
import STORE from "./assets/scripts/store.js";
import singleBoardPage from "./assets/scripts/views/boardPage.js";
import LoginPage from "./assets/scripts/views/login.js";
import { Layout } from "./assets/scripts/views/main.js";

async function init() {
  try {
    const token = sessionStorage.getItem(tokenKey);

    if (!token) throw new Error();

    await STORE.fetchBoards();
    if (localStorage.getItem(currBoard)) {
      DOMHandler.load(singleBoardPage)
    } else {
      DOMHandler.load(Layout);
    }
  } catch (error) {
    console.log(error);
    sessionStorage.removeItem(tokenKey);
    localStorage.removeItem(currUser)
    localStorage.removeItem(currPage)
    localStorage.removeItem(currBoard)
    DOMHandler.load(LoginPage);
  }
}
init();
