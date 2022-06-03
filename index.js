import { login } from "./assets/scripts/services/session-services.js";
import { createUser } from "./assets/scripts/services/user-services.js";

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
  // const user = await login(credentials)
  try {
    // const user = await createUser(newUser)
    // console.log(user);    
  } catch (error) {
    console.log(error);
  }

}

random()
