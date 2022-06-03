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

export async function editList(
  idBoard,
  payload = { name },
  idList
) {
  const { token, ...user } = await apiFetch(`boards/${idBoard}/lists/${idList}`, {
    method: "PATCH",
    body: payload,
  });
  return user;
}

export async function deleteList(
  idBoard,
  idList
) {
  return apiFetch(`boards/${idBoard}/lists/${idList}`, { method: "DELETE" });
}
