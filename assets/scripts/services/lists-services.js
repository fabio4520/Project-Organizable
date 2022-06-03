import apiFetch from "./api-fetch.js";

export async function sortLists(
  idBoard,
  body = { ids: [] }
) {
  return apiFetch(`boards/${idBoard}/lists/sort`, {body: body});
}

export async function createList(
  idBoard,
  newList = { name }
) {
  return apiFetch(`boards/${idBoard}/lists`, { body: newList });
}

// export async function showBoard(id) {
//   return apiFetch("boards/" + id);
// }

// export async function editBoard(
//   id,
//   payload = { name, color }
// ) {
//   const { token, ...user } = await apiFetch("boards/" + id, {
//     method: "PATCH",
//     body: payload,
//   });
//   return user;
// }

// export async function deleteBoard(id) {
//   return apiFetch("boards/" + id, { method: "DELETE" });
// }
