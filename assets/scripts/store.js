import { currUser } from "./config.js";
import { getBoards } from "./services/boards-services.js";


async function fetchBoards() {
  const boards = await getBoards();
  this.boards = [... boards.filter(b => b.closed === false)];
  this.closed = [... boards.filter(b => b.closed === true)]
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
}
function restoringBoard(id) {
  // hago un push del board que está en close
  this.boards.push(this.closed.find( b => b.id == id ))
  // elimino el board close del array closed.
  this.closed = this.closed.filter(c => c.id != id);
}

const STORE = {
  currentPage: "profile",
  currentUser: JSON.parse(localStorage.getItem(currUser)),
  boards: [],
  closed: [],
  fetchBoards,
  deleteBoard,
  closingBoard,
  restoringBoard,
  changeColor
}
export default STORE