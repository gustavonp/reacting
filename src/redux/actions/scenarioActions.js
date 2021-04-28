import * as types from './actionTypes';
import * as scenarioApi from '../../api/scenarioApi';

export function createScenario(scenario){
  return { type: types.CREATE_SCENARIO, scenario: scenario};
}

export function loadScenariosSuccess(scenarios){
  return { type: types.LOAD_SCENARIOS_SUCCESS, scenarios }
}

export function loadScenarioSuccess(scenario){
  return { type: types.LOAD_SCENARIO_SUCCESS, scenario }
}

//thunk
export function loadScenarios(){
  return function (dispatch) {
    return scenarioApi.getScenarios().then(scenarios => {
      dispatch(loadScenariosSuccess(scenarios));
    }).catch(error => {
      throw error;
    })
  }
}

export function loadScenario(scenarioId){

  return function (dispatch) {
    return scenarioApi.getScenario(scenarioId).then(scenario => {
      dispatch(loadScenarioSuccess(scenario));
    }).catch(error => {
      throw error;
    })
  }
}