import * as types from './actionTypes';
import * as scenarioApi from '../../api/scenarioApi';

export function createScenario(scenario){
  return { type: types.CREATE_SCENARIO, scenario: scenario};
}

export function loadScenariosSuccess(scenarios){
  return { type: types.LOAD_SCENARIOS_SUCCESS, scenarios }
}

export function loadScenarios(){
  return function (dispatch) {
    return scenarioApi.getScenarios().then(scenarios => {
      dispatch(loadScenariosSuccess(scenarios));
    }).catch(error => {
      throw error;
    })
  }
}