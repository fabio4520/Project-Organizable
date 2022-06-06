import { currBoard } from "../config.js";
import DOMHandler from "../dom-handler.js";
import { createList, deleteList } from "../services/lists-services.js";
import STORE from "../store.js";
import { Layout } from "./main.js";

function renderSingleBoard() {
  const board = STORE.currBoard
  const lists = board.lists
  console.log(board);
  return `
  <header class="header">
    <h1 id="goLogin"><img src="/assets/images/organizable.png" alt="Organizable" /></h1>
    <h2>Welcome to {organizable}</h2>
  </header>
  <h2>${board.name}</h2>
  <div class="lists-container">
    ${ lists.length > 0 ? lists.map(l => renderList(l)).join("") : ""}
    
    <form action="" class="form-list">
      <input type="text" id="listName" placeholder="new list">
      <button type="submit" class="form-btn">
        <i class="fa-solid fa-circle-plus"></i>
      </button>
    </form>

  </div>
  `
}
function renderList(list) {
  return `
  <div class="list" data-id=${list.listId}>
    <div class="header-list">
      <h2>${list.name}</h2>
      <div class="edit-delete">
        <a href="#edit"><i class="fa-solid fa-pen-to-square"></i></a>
        <a href="#deleteList" class="delList"><i class="fa-solid fa-trash-can"></i></a>
      </div>
    </div>
    <div class="cards-container">
      ${list.cards ? list.cards.map( c => renderCard(c) ).join("") : ""}
    </div>
    
    <form action="" class="form-card">
      <input type="text" placeholder="new card">
      <i class="fa-solid fa-circle-plus"></i>
    </form>

  </div>
  `
}
function renderCard(card) {
  return `
  <div class="card">
    <p>${card.name}</p>
    <a href="#deleteCard"><i class="fa-solid fa-trash-can"></i></a>
  </div>
  `
}

// listeners for List
function listenCreateList() {
  const form = document.querySelector(".form-list")
  const idBoard = STORE.currBoard.id
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const newL = {
      name: e.target.listName.value
    }
    const newList = await createList(idBoard, newL)
    
    STORE.currBoard.lists.push(newList)
    localStorage.setItem(currBoard, JSON.stringify(STORE.currBoard))
    
    DOMHandler.reload()
  })
}

function listenDeleteList() {
  const allDelAnchor = document.querySelectorAll(".delList")
  allDelAnchor.forEach(a => {
    a.addEventListener('click', async e => {
      e.preventDefault();
      const list = e.target.closest(".list")
      const id = list.dataset.id
      const index = STORE.currBoard.lists.findIndex(l => l.listId == id);
      // console.log(index);
      // console.log(STORE.currBoard.lists[index]);
      await deleteList(STORE.currBoard.id, id)
      STORE.currBoard.lists.splice(index, 1)
      localStorage.setItem(currBoard, JSON.stringify(STORE.currBoard))
      DOMHandler.reload()
    })
  } )
}

// listener for header
function listenHeader() {
  const h1 = document.querySelector("#goLogin")
  h1.addEventListener('click', ()=> {
    DOMHandler.load(Layout);
    localStorage.removeItem(currBoard);
  })
}

const singleBoardPage = {
  toString() {
    return renderSingleBoard();
  },
  addListeners() {
   listenHeader(),listenCreateList(), listenDeleteList()
  }
};

export default singleBoardPage;

