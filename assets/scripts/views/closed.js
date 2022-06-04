import DOMHandler from "../dom-handler.js";
import { deleteBoard, editBoard } from "../services/boards-services.js";
import STORE from "../store.js";
import { renderBoard } from "./boards.js";

function renderClosed() {
  const closed = STORE.closed
  if (closed.length === 0)
    return `
    <div class="boards boards--no-content"><h2>No boards closed</h2></div>`;
  return `
  <h2>Closed Boards</h2>
  <div class="boards js-boards">
    <ul>
      ${closed
        .map((c) => renderBoard(c, true))
        .join("")}
    </ul>
  </div>
    `;
}

function listenDelete() {
  const container = document.querySelector(".js-boards");
  if (!container) return;
  container.addEventListener("click", (e) => {
    const deletedBins = container.querySelectorAll(".delete-trigger");
    deletedBins.forEach( async (deletedBin) => {
      if (deletedBin === e.target) {
        console.log(e.target);
        e.preventDefault();
        const parentboard = deletedBin.closest(".board");
        parentboard.classList.add("trashOut");
        parentboard.addEventListener("animationend", () => {
          DOMHandler.reload()
        });
        const id = parentboard.dataset.id;
        STORE.deleteBoard(id)
        await deleteBoard(id)
      }
    });
  });
}

function listenRestore() {
  const container = document.querySelector(".js-boards");
  if (!container) return;
  container.addEventListener("click", (e) => {
    const restoreArrows = container.querySelectorAll(".restore-trigger");
    restoreArrows.forEach(async (restoreArrow) => {
      if (restoreArrow === e.target) {
        e.preventDefault();
        const parentboard = restoreArrow.closest(".board");
        parentboard.classList.add("goBack");
        parentboard.addEventListener("animationend", () => {
          DOMHandler.reload();
        });
        const id = parentboard.dataset.id;
        STORE.restoringBoard(id)
        await editBoard(id, {closed: false })
      }
    });
  });
}

const ClosedPage = {
  toString() {
    return renderClosed();
  },
  addListeners() {
    listenDelete(), listenRestore()
  },
};

export {
  ClosedPage
};



