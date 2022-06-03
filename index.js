import { getBoards, showBoard } from "./assets/scripts/services/boards-services.js";
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
async function random() {

  try {
    await login(credentials)
    // const boards = await getBoards()
    const board = await showBoard(746)
    console.log(board);
  } catch (error) {
    console.log(error);
  }

}

random()
