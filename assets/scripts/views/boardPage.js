import STORE from "../store.js";

function renderSingleBoard() {
  const board = STORE.currBoard
  const lists = board.lists
  console.log(board);
  return `
  <h1>${board.name}</h1>
  <div class="lists-container">
    ${ lists.length > 0 ? lists.map( l => renderList(l) ).join("") : ""}
  </div>
  `
}

function renderList(list) {
  return `
  <div class="list">
    <div class="header-list">
      <h2>${list.name}</h2>
      <div class="edit-delete">
        <a href="#edit"><i class="fa-solid fa-pen-to-square"></i></a>
        <a href="#deleteList"><i class="fa-solid fa-trash-can"></i></a>
      </div>
    </div>
    <div class="cards-container">
      ${list.cards.map( c => renderCard(c) ).join("")}
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

const singleBoardPage = {
  toString() {
    return renderSingleBoard();
  },
  addListeners() {
   
  }
};

export default singleBoardPage;

