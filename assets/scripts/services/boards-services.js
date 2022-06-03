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
