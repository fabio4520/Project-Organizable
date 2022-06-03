import DOMHandler from "../dom-handler.js";
import { editBoard } from "../services/boards-services.js";
import STORE from "../store.js";
import { renderToolTip } from "../utils.js";

function renderBoard(board, isClosed) {
  let footer = `<footer>
    ${renderToolTip()}
    <div class="closed">
      <a class="closed-trigger" href="#closed">
        <i class="ri-delete-bin-fill"></i>
      </a>
    </div>
  </footer>`;

  if (isClosed) {
    footer = `<footer>
      <div class="delete">
        <a class="delete-trigger" href="#delete">
          <i class="ri-delete-bin-fill"></i>
        </a>
      </div>
      <div class="restore">
        <a class="restore-trigger" href="#restore">
        <i class="ri-arrow-go-back-fill"></i>
        </a>
      </div>
    </footer>`;
  }

  return `
  <li class="board" style="background-color: var(--${board.color})" data-id="${board.id}" draggable="true">
    <h3 class="board-title">${board.name}</h3>
    <p class="board-body"></p>
    ${footer}
  </li>`;
}

function renderBoards() {
  const boards = STORE.boards
  if (boards.length === 0)
    return `
    <div class="boards boards--no-content"><h2>No boards to keep</h2></div>`;
  return `
  <h2>My boards</h2>
  <div class="boards js-boards">
    <ul>
      ${boards
        .map((board) => renderBoard(board))
        .join("")}
    </ul>
  </div>
    `;
}

function listenToolTips() {
  const container = document.querySelector(".js-boards");
  if (!container) return;

  container.addEventListener("mouseover", (e) => {

    const tooltips = container.querySelectorAll(".tooltip"); // selecciono los divs que contienen los iconos de paleta de colores
    
    tooltips.forEach((tooltip) => {
      
      const trigger = tooltip.querySelector(".tooltip-trigger"); // selecciono el anchor que tiene el tooltip (paleta de colores)
      const content = tooltip.querySelector(".tooltip-content"); // el div que contiene los circulos de colroes.
      
      const onMouseLeave = (e) => {
        if (tooltip === e.target) {
          tooltip.removeEventListener("mouseleave", onMouseLeave);
          content.classList.add("hidden");
        }
      };
      if (trigger === e.target) {
        content.classList.remove("hidden");
        tooltip.addEventListener("mouseleave", onMouseLeave);
      }
    });

  });
  container.addEventListener("click", (e) => {
    const triggers = container.querySelectorAll(".tooltip-option");
    triggers.forEach(async (trigger) => {
      if (trigger === e.target) {
        e.preventDefault();
        
        const id = trigger.closest(".board").dataset.id;
        const color = trigger.dataset.color;
 
        STORE.changeColor(id, "board", color)
        await editBoard(id, {color: color })
 
        DOMHandler.reload();
      }
    });
  });
}

function listenClosed() {
  const container = document.querySelector(".js-boards");
  if (!container) return;
  container.addEventListener("click", (e) => {
    const closedBins = container.querySelectorAll(".closed-trigger");
    closedBins.forEach( async (closedBin) => {
      if (closedBin === e.target) {
        e.preventDefault();
        const parentboard = closedBin.closest(".board");
        parentboard.classList.add("shrinkOut");
        parentboard.addEventListener("animationend", (e) => {
          DOMHandler.reload()
        });
        const id = parentboard.dataset.id;
        STORE.closingBoard(id)
        await editBoard(id, {closed: true })
        console.log(STORE);
        // await deleteBoard(id)
      }
    });
  });
}


const BoardsPage = {
  toString() {
    return renderBoards();
  },
  addListeners() {
    listenToolTips(), listenClosed()
  },
};

export {
  renderBoard, renderBoards,
  BoardsPage
};
