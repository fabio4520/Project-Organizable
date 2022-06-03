import { tokenKey } from "../config.js"
import apiFetch from "./api-fetch.js"

export async function createUser(credentials = { email, password }) {
  const {token, ...user} = await apiFetch("users", { body: credentials })

  sessionStorage.setItem(tokenKey, token)
  return user;
}

export async function showUser(id) {
  const {token, ...user} = await apiFetch("users/" + id)
  
  return user;
}