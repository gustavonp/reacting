import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/scenarios/";

export function getScenarios() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getScenario(scenarioId) {
  const fullUrl = `${baseUrl}${scenarioId}`;
  return fetch(fullUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveScenario(scenario) {
  return fetch(baseUrl + (scenario.id || ""), {
    method: scenario.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(scenario)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteScenario(scenarioId) {
  return fetch(baseUrl + scenarioId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
