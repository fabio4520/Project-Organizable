import apiFetch from "./api-fetch.js";

export async function getBoards() {
  return apiFetch("boards");
}

