import { currBoard, currPage, currUser } from "./config.js";
import { getBoards } from "./services/boards-services.js";


async function fetchBoards() {
  const boardsAll = await getBoards();
  this.boards = [... boardsAll.filter(b => b.closed === false && b.starred === false)];
  this.closed = [... boardsAll.filter(b => b.closed === true)]
  this.starred = [... boardsAll.filter(b => b.starred === true)]
}

function changeColor(id, type, color) {
  if (type == "board") {
    this.boards.find(b => b.id == id).color = color;
  }
}

function deleteBoard(id) {
  this.boards = this.boards.filter( b => b.id != id);
  this.closed = this.closed.filter( c => c.id != id);
}
function closingBoard(id) {
  // hago un push del board que quiero hacer close
  this.closed.push(this.boards.find( c => c.id == id ))
  // elimino el board del array boards
  this.boards = this.boards.filter(b => b.id != id);
  // elimino el board del array boards
  this.starred = this.starred.filter(b => b.id != id);
}
function restoringBoard(id) {
  // hago un push del board que está en close
  this.boards.push(this.closed.find( b => b.id == id ))
  // elimino el board close del array closed.
  this.closed = this.closed.filter(c => c.id != id);
}

function staringBoard(id) {
  this.starred.push(this.boards.find( b => b.id == id ))
  // elimino el board close del array closed.
  this.boards = this.boards.filter(b => b.id != id);
}

const STORE = {
  currentPage: localStorage.getItem(currPage) || "boards",
  currentUser: JSON.parse(localStorage.getItem(currUser)),
  currBoard: JSON.parse(localStorage.getItem(currBoard)),
  boards: [],
  closed: [],
  starred: [],
  fetchBoards,
  deleteBoard,
  closingBoard,
  restoringBoard,
  changeColor,
  staringBoard
}
export default STORE