export default function categoryReducer(state = [], action) {
  switch(action.type){
    case "CREATE_CATEGORY":
      return [ ...state,  { ...action.category }];
    default:
      return state;
  }
}