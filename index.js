import { createBoard, deleteBoard, editBoard, getBoards, showBoard } from "./assets/scripts/services/boards-services.js";
import { createCard, deleteCard, editCard, showCard, sortCards } from "./assets/scripts/services/cards-services.js";
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
const newCard = {
  name: "Un bellaqueo bien Nasty"
}
const newCard2 = {
  name: "El 🍑 real pero las 🍩🍩 son plastic"
}
async function random() {

  try {
    await login(credentials)
    // const cards = await sortCards(379, {
      // "ids" : [556, 555, 557]
    // })
    // console.log(cards);
    // const card = await createCard(380, newCard)
    // const card = await showCard(379, 555)
    // const card = await editCard(379, newCard2, 555)
    // const card = await deleteCard(379, 557)
    // console.log(card);
  } catch (error) {
    console.log(error);
  }

}

random()
