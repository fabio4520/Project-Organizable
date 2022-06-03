import apiFetch from "./api-fetch.js";

export async function sortCards(
  idList,
  body = { ids: [] }
) {
  return apiFetch(`lists/${idList}/cards/sort`, {body: body});
}

export async function createCard(
  idList,
  newList = { name }
) {
  return apiFetch(`lists/${idList}/cards`, { body: newList });
}

export async function showCard(
  idList,
  idCard
) {
  return apiFetch(`/lists/${idList}/cards/${idCard}`)
}

export async function editCard(
  idList,
  payload = { name, list_id, pos },
  idCard
) {
  const { token, ...card } = await apiFetch(`lists/${idList}/cards/${idCard}`, {
    method: "PATCH",
    body: payload,
  });
  return card;
}

export async function deleteCard(
  idList,
  idCard
) {
  return apiFetch(`lists/${idList}/cards/${idCard}`, { method: "DELETE" });
}
