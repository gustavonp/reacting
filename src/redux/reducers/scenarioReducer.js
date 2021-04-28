import * as types from '../actions/actionTypes';

export default function scenarioReducer(state = [], action) {
  switch(action.type){
    case types.LOAD_SCENARIOS_SUCCESS:
      return action.scenarios;
    case types.LOAD_SCENARIO_SUCCESS:
      return action.scenario;
    case types.CREATE_SCENARIO:
      return [ ...state,  { ...action.scenario }];
    default:
      return state;
  }
}