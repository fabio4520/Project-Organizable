import { tokenKey } from "../config.js"
import apiFetch from "./api-fetch.js"

export async function createUser(credentials = { email, password }) {
  const {token, ...user} = await apiFetch("users", { body: credentials })
  console.log(token);
  sessionStorage.setItem(tokenKey, token)
  return user;
}
