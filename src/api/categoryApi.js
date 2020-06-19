import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/categories/";

export function getCtegories() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
