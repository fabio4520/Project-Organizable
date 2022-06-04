import { currUser, tokenKey } from "../config.js"
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

export async function editUser(
  id,
  payload = { last_name, first_name }
) {
  const { token, ...user } = await apiFetch("users/" + id, {
    method: "PATCH",
    body: payload,
  });
  localStorage.setItem(currUser, JSON.stringify(user))
  return user;
}

export async function deleteUser(id) {
  return apiFetch("users/" + id, { method: "DELETE" });
}
