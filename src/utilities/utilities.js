import { GetCategory, GetPlayableScenarios } from '../services/database'

/**
 * Get the first game match
 */
export function GetFirstMatch() {
  const database = GetPlayableScenarios();

  shuffleScenarios(database);
  return {
    firstItem: database[0],
    secondItem: database[1]
  };
}

/**
 * FetchScenario
 * @param {num} id scenario is
 */
export function FetchScenario(id) {
  const database = GetPlayableScenarios();
  const { scenario } = database.find(c => c.id === parseInt(id));
  return scenario;
}

/**
 * FetchScenarioRow
 * @param {num} id scenario is
 */
export function FetchScenarioRow(id) {
  const database = GetPlayableScenarios();
  return database.find(c => c.id === parseInt(id));
}

export function FetchCategoryId(scenarioId) {
  let scenario = FetchScenarioRow(scenarioId);
  return scenario.category;
};

export function FetchCategory(scenarioId){
  let scenario = FetchScenarioRow(scenarioId);  
  let category
  FetchCategories().map(categ => {
    if(categ.id == scenario.category){
      category = categ;
    }
  });
  return category ? category : false;
}

export function FetchCategories(){
  const database = GetCategory();
  return database;
}

/**
 * Grab the whole database and shuffle it
 * @param {array} array all atabase
 */
function shuffleScenarios(array) {
  var i = 0,
    j = 0,
    temp = null;

  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

/**
 * Reshuffle scenarios and fetch a new pair, if all possible matches were selected before then fetch a new pair
 * @param {num} chosenOption selected button's ID
 * @param {num} optionToReplace button ID to be replaced
 * @param {obj} matchedScenarios all previously matched scenarios
 */
export function reshuffleScenarios(
  chosenOption,
  optionToReplace,
  matchedScenarios
) {
  var fetchNewScenarios = {
    id1: null,
    scenario1: "",
    id2: null,
    scenario2: ""
  };

  const allScenarios = GetPlayableScenarios();
  const arrNewSelections = allScenarios.filter(as => as.id !== chosenOption && as.id !== optionToReplace);
  const newTry = matchedScenarios.filter(ms => ms.includes(chosenOption));
  var newArrToCrop = arrNewSelections;

  for(let j = 0; j < newTry.length; j++){
    newArrToCrop = newArrToCrop.filter(nar => nar.id !== newTry[j][0] && nar.id !== newTry[j][1])
  }

  if(newArrToCrop.length < 1){
      for (let y = 0; y < arrNewSelections.length; y++) {
        if (
          validateComparison(
          optionToReplace,
          arrNewSelections[y].id,
          matchedScenarios)
        ) {
          fetchNewScenarios.id1 = optionToReplace;
          fetchNewScenarios.scenario1 = FetchScenario(optionToReplace);
          fetchNewScenarios.id2 = arrNewSelections[y].id;
          fetchNewScenarios.scenario2 = arrNewSelections[y].scenario;
          break;
        }
      }
  }else{
    for (let x = 0; x < newArrToCrop.length; x++) {
      if (
        validateComparison(chosenOption, newArrToCrop[x].id, matchedScenarios)
      ) {
        fetchNewScenarios.id1 = chosenOption;
        fetchNewScenarios.scenario1 = FetchScenario(chosenOption);
        fetchNewScenarios.id2 = newArrToCrop[x].id;
        fetchNewScenarios.scenario2 = newArrToCrop[x].scenario;
        break;
      }
    }
  }

  if (fetchNewScenarios.id1 == null) {
    var newPair = fetchNewPair(matchedScenarios);
    if (!newPair.id1) {
      alert("There are no more combinations available");
      return false;
    }
  }

  return fetchNewScenarios;
}

/**
 * fetchNewPair
 * @param {obj} matchedScenarios all previously matched scenarios
 */
function fetchNewPair(matchedScenarios) {
  const allScenarios = GetPlayableScenarios();
  shuffleScenarios(allScenarios);

  var newScenario = {
    id1: null,
    scenario1: "",
    id2: null,
    scenario2: ""
  };

  for (let x = 0; x < allScenarios.length - 1; x++) {
    if (
      validateComparison(
        allScenarios[x].id,
        allScenarios[x + 1].id,
        matchedScenarios
      )
    ) {
      newScenario.id1 = allScenarios[x].id;
      newScenario.scenario1 = allScenarios[x].scenario;
      newScenario.id2 = allScenarios[x + 1].id;
      newScenario.scenario2 = allScenarios[x + 1].scenario;
      break;
    }
  }

  return newScenario;
}

/**
 * validateComparison
 * @param {obj} chosenOption voted scenario
 * @param {obj} newMatch new selected match
 * @param {obj} oldMatches all previous matches
 */
function validateComparison(chosenOption, newMatch, oldMatches) {
  const checkMatched = oldMatches.filter(ol => ol.includes(chosenOption) && ol.includes(newMatch));
  return checkMatched.length === 0 ? true : false ;
}


export function setCategoryPercentage (scoreBoard) {
  let categoryScore = scoreBoard.reduce((result, item) => {
    result[FetchCategoryId(item[1])] = FetchCategoryId(item[1]) in result ? 
      (result[FetchCategoryId(item[1])] + item[0]) : 
      item[0];
    return result
  }, {});

  // console.log(categoryScore);


  let totalValue = 0;
  Object.values(categoryScore).reduce((result, item, key) => {
    totalValue += item;
  }, {});

  console.log(`totalValue ${totalValue}`);
  console.log(`categoryScore points ${Object.keys(categoryScore).length}`);


  

  // 1- salva a soma de todos
  // 2- pega o valor
  // 3- calcule a porcentagem
  // 4- retorne a porcentagem ao ID escolhido

  /**
   * 
   * (x / sum) * 100
   * 
   */
  
  // return categoryScore
}