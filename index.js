import { login } from "./assets/scripts/services/session-services.js";

const credentials = {
  username: "fabio",
	password: "123456"
}

async function random() {
  const user = await login(credentials)
  console.log(user);
}

random()
