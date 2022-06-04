import DOMHandler from "../dom-handler.js";
import { deleteBoard } from "../services/boards-services.js";
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

// function listenRestore() {
//   const container = document.querySelector(".js-notes");
//   if (!container) return;
//   container.addEventListener("click", (e) => {
//     const restoreArrows = container.querySelectorAll(".restore-trigger");
//     restoreArrows.forEach((restoreArrow) => {
//       if (restoreArrow === e.target) {
//         e.preventDefault();
//         const parentNote = restoreArrow.closest(".note");
//         parentNote.classList.add("goBack");
//         parentNote.addEventListener("animationend", (e) => {
//           loadContent();
//         });
//         STORE.notes = STORE.notes.map((note) => {
//           if (note.id === parentNote.dataset.id) {
//             return { ...note, deleted: false };
//           }
//           return note;
//         });
//       }
//     });
//   });
// }

const ClosedPage = {
  toString() {
    return renderClosed();
  },
  addListeners() {
    listenDelete()
  },
};

export {
  ClosedPage
};



