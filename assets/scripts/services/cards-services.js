import apiFetch from "./api-fetch.js";

export async function sortCards(
  idList,
  body = { ids: [] }
) {
  return apiFetch(`lists/${idList}/cards/sort`, {body: body});
}

// export async function createList(
//   idList,
//   newList = { name }
// ) {
//   return apiFetch(`lists/${idList}/lists`, { body: newList });
// }

// export async function editList(
//   idList,
//   payload = { name },
//   idList
// ) {
//   const { token, ...user } = await apiFetch(`lists/${idList}/lists/${idList}`, {
//     method: "PATCH",
//     body: payload,
//   });
//   return user;
// }

// export async function deleteList(
//   idList,
//   idList
// ) {
//   return apiFetch(`lists/${idList}/lists/${idList}`, { method: "DELETE" });
// }
