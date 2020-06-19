import * as types from '../actions/actionTypes';

export default function scenarioReducer(state = [], action) {
  switch(action.type){
    case types.CREATE_SCENARIO:
      return [ ...state,  { ...action.scenario }];
    default:
      return state;
  }
}