import { currPage } from "../config.js";
import DOMHandler from "../dom-handler.js";
import { createBoard, editBoard } from "../services/boards-services.js";
import STORE from "../store.js";
import { renderToolTip } from "../utils.js";

function renderModal() {
  return `
  <div id="myModal" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      
      <div class="newBoard">
      
        <form class="boardForm" action="">
          <input id="boardName" class="boardName" type="text" placeholder="Board name">
          <button id="createBtn" class="createBtn" type="submit">CREATE</button>
        </form>

        <div class="picker-grid">
          <div class="picker-div" data-color="green" style="background-color: green"></div>
          <div class="picker-div" data-color="yellow" style="background-color: yellow"></div>
          <div class="picker-div" data-color="orange" style="background-color: orange"></div>

          <div class="picker-div" data-color="red" style="background-color: red"></div>
          <div class="picker-div" data-color="purple" style="background-color: purple"></div>
          <div class="picker-div" data-color="blue" style="background-color: blue"></div>
          
          <div class="picker-div" data-color="#42D781"  style="background-color: #42D781"></div>
          <div class="picker-div" data-color="#BDBDBD" style="background-color: #BDBDBD"></div>
          <div class="picker-div" data-color="#9DE0F9" style="background-color: #9DE0F9"></div>  
        </div>
      </div>
    </div>

  </div>
  `
}
// green yellow orange red purple blue
function listenCreateBoard() {
  const pickerDivs = document.querySelectorAll(".picker-div")
  const form = document.querySelector(".boardForm")
  let color;
  pickerDivs.forEach(p => {
    p.addEventListener('click', (e) => {
      color = e.target.dataset.color
      form.style.backgroundColor = color
    })
  })
  // create board
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newBoard = {
      name: e.target.boardName.value,
      color: color
    }
    console.log(newBoard);
    const newB = await createBoard(newBoard)
    STORE.boards.push(newB)
    DOMHandler.reload()
  })
}

function listenModal() {
  try {
    const cardForm = document.querySelector("#createBoard")
    const closeBtn = document.querySelector(".close-btn")
    cardForm.addEventListener('click', () => {
      document.querySelector("#myModal").style.display = 'flex'
    })
    closeBtn.addEventListener('click', () => {
      document.querySelector("#myModal").style.display = 'none'
    })
    listenCreateBoard()  
  } catch (error) {
    
  }
}

function renderBoard(board, isClosed) {
  let footer = `<footer>
    
    <div class="starred">
      <a class="star-trigger" href="#starred">
        <i class="fas fa-star"></i>
      </a>
    </div>

    ${renderToolTip()}
    <div class="closed">
      <a class="closed-trigger" href="#closed">
        <i class="ri-delete-bin-fill"></i>
      </a>
    </div>
  </footer>`;

  if (isClosed) {
    footer = `
    <footer>
    <div class="restore">
      <a class="restore-trigger" href="#restore">
      <i class="ri-arrow-go-back-fill"></i>
      </a>
    </div>
    <button class="delete is-large delete-trigger"></button>
     
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
  const starred = STORE.starred
  console.log(STORE);
  if (boards.length === 0 && starred.length ===0)
    return `
    <div class="boards boards--no-content"><h2>No boards to keep</h2></div>
    `;
  if (starred.length != 0) {
    return `
    <h2>My boards</h2>
    <h3>Starred Boards</h3>
    <div class="boards js-boards-starred">
      <ul>
        ${starred
          .map((board) => renderBoard(board))
          .join("")}
      </ul>
    </div>
    <h3>Boards</h3>
    <div class="boards js-boards">
      <ul>
        ${boards
          .map((board) => renderBoard(board))
          .join("")}
        <div id="createBoard" class="board is-flex is-justify-content-center is-align-items-center" style="background-color: var(--white)" draggable="true">
          <h3>Create Board</h3>
        </div>
        ${renderModal()}
      </ul>
    </div>
    `
  }
  return `
  <h2>My boards</h2>
  <h3>Boards</h3>
  <div class="boards js-boards">
    <ul>
      ${boards
        .map((board) => renderBoard(board))
        .join("")}
        <div id="createBoard" class="board is-flex is-justify-content-center is-align-items-center" style="background-color: var(--white)" draggable="true">
          <h3>Create Board</h3>
        </div>
        ${renderModal()}
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
        await editBoard(id, {closed: true, starred: false })
      }
    });
  });
}

function listenStar() {
  const starredList = document.querySelectorAll(".star-trigger")
  starredList.forEach(star => {
    star.addEventListener('click', async (event) => {
      event.preventDefault()
      const parentboard = star.closest(".board");
      parentboard.addEventListener("animationend", (e) => {
        DOMHandler.reload()
      });
      const id = parentboard.dataset.id;
      STORE.staringBoard(id)
      await editBoard(id, {starred: true })
      console.log(STORE);
      window.location.reload();
        return false
    })
  } )
}

const BoardsPage = {
  toString() {
    return renderBoards();
  },
  addListeners() {
    listenToolTips(), listenClosed(), listenStar(), listenModal()
  },
};

export {
  renderBoard, renderBoards,
  BoardsPage
};
