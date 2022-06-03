import apiFetch from "./api-fetch.js";

export async function getBoards() {
  return apiFetch("boards");
}

export async function showBoard(id) {
  return apiFetch("boards/" + id);
}

export async function createBoard(
  newBoard = { name, color }
) {
  return apiFetch("boards", { body: newBoard });
}

export async function editBoard(
  id,
  payload = { name, color }
) {
  const { token, ...user } = await apiFetch("boards/" + id, {
    method: "PATCH",
    body: payload,
  });
  return user;
}

export async function deleteBoard(id) {
  return apiFetch("boards/" + id, { method: "DELETE" });
}
