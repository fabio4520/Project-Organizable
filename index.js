import { createBoard, deleteBoard, editBoard, getBoards, showBoard } from "./assets/scripts/services/boards-services.js";
import { createList, sortLists } from "./assets/scripts/services/lists-services.js";
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
  name: "antologia 2.0"
}
async function random() {

  try {
    await login(credentials)
    // const lists = await sortLists(746, { "ids": [380, 379, 381] })
    // console.log(lists);
    // const list = await createList(746, newList)
    // console.log(list);
  } catch (error) {
    console.log(error);
  }

}

random()
