import { createBoard, deleteBoard, editBoard, getBoards, showBoard } from "./assets/scripts/services/boards-services.js";
import { sortCards } from "./assets/scripts/services/cards-services.js";
import { createList, deleteList, editList, sortLists } from "./assets/scripts/services/lists-services.js";
import { login } from "./assets/scripts/services/session-services.js";
import { createUser, editUser, showUser } from "./assets/scripts/services/user-services.js";

const credentials = {
  username: "fabio",
	password: "123456"
}
const newUser = {
	username: "fabio2",
	email: "fabio2@mail.com",
	first_name: "Fabio2",
	last_name: "Fiestas2",
	password: "123456"
}
const newBoard = {
  name: "fiu fiuuuuu",
  color: "blue"
}
const newList = {
  name: "El ga-ti-to tuyo te perdió por negligencia"
}
async function random() {

  try {
    await login(credentials)
    const cards = await sortCards(379, {
      "ids" : [556, 555, 557]
    })
    console.log(cards);
    // const list = await deleteList(746, 387)
    // console.log(list);
  } catch (error) {
    console.log(error);
  }

}

random()
