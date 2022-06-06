import { currBoard } from "../config.js";
import DOMHandler from "../dom-handler.js";
import { createCard, deleteCard } from "../services/cards-services.js";
import { createList, deleteList } from "../services/lists-services.js";
import STORE from "../store.js";
import { Layout } from "./main.js";

// Renders
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
      <input type="text" id="cardName" placeholder="new card">
      <button type="submit" class="form-btn">
        <i class="fa-solid fa-circle-plus"></i>
      </button>
    </form>

  </div>
  `
}

function renderCard(card) {
  return `
  <div class="card" data-id=${card.cardId}>
    <p>${card.name}</p>
    <a href="#deleteCard" class="delCard"><i class="fa-solid fa-trash-can"></i></a>
  </div>
  `
}
function listenDeleteCard() {
  const allDelAnchor = document.querySelectorAll(".delCard")
  allDelAnchor.forEach(a => {
    a.addEventListener('click', async e => {
      e.preventDefault();
      const list = e.target.closest(".list")
      const idList = list.dataset.id
      const indexList = STORE.currBoard.lists.findIndex(l => l.listId == idList);
      const idCard = e.target.closest(".card").dataset.id
      const indexCard = STORE.currBoard.lists[indexList].cards.findIndex(c => c.cardId == idCard);;

      await deleteCard(idList, idCard)
      STORE.currBoard.lists[indexList].cards.splice(indexCard, 1)
      localStorage.setItem(currBoard, JSON.stringify(STORE.currBoard))
      DOMHandler.reload()
    })
  } )
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

// listener for card
function listenCreateCard() {
  const formAll = document.querySelectorAll(".form-card")
  formAll.forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const list = e.target.closest(".list")
      const idList = list.dataset.id
      const index = STORE.currBoard.lists.findIndex(l => l.listId == idList);
      const newC = {
        name: e.target.cardName.value
      }
      const newCard = await createCard(idList, newC)
      console.log(newCard);
      STORE.currBoard.lists[index].cards.push(newCard)
      localStorage.setItem(currBoard, JSON.stringify(STORE.currBoard))
      
      DOMHandler.reload()
    })
  })
  
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
    listenHeader(), listenCreateList(), listenDeleteList(),
     listenCreateCard(), listenDeleteCard()
  }
};

export default singleBoardPage;

