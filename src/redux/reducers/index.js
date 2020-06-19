import { combineReducers } from 'redux';
import scenarios from './scenarioReducer';
import categories from './categoryReducer';

const rootReducer = combineReducers({
  scenarios: scenarios, 
  categories: categories
});

export default rootReducer;