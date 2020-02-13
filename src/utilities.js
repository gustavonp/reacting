/**
 * Grab the whole database and shuffle it
 * @param {array} array all atabase
 */
export function shuffleScenarios (array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

/**
 * reshuffleScenarios
 * @param {num} chosenOption selected button's ID
 * @param {num} optionToReplace button ID to be replaced
 * @param {obj} matchedScenarios all previously matched scenarios
 */
export function reshuffleScenarios (chosenOption, optionToReplace, matchedScenarios){

  var allScenarios = JSON.parse(localStorage.getItem('scenarios'));
  shuffleScenarios(allScenarios);

  var x = 0;
  var fetchNewScenario = {
    id: null,
    scenario: ''
  };

  for(x = 0; x < allScenarios.length; x++){
    if(allScenarios[x].id !== chosenOption && allScenarios[x].id !== optionToReplace){
      if(validateComparison(chosenOption, allScenarios[x].id, matchedScenarios)){

        fetchNewScenario.id = allScenarios[x].id;
        fetchNewScenario.scenario = allScenarios[x].scenario;
        break;
      }
    }
  }
  if(fetchNewScenario.id == null){
    alert('There are no more matches');
    return false;
    // fetchNewPair(chosenOption, optionToReplace, matchedScenarios);
  }
  return {
    id: fetchNewScenario.id,
    scenario: fetchNewScenario.scenario
  };
}

export function fetchNewPair(chosenOption, optionToReplace, matchedScenarios) {
  var allScenarios = JSON.parse(localStorage.getItem('scenarios'));
  shuffleScenarios(allScenarios);

  var x = 0;
  var fetchNewScenario = {
    id: null,
    scenario: ''
  };

  for(x = 0; x < allScenarios.length; x++){
    if(allScenarios[x].id !== optionToReplace && allScenarios[x].id !== chosenOption){
      if(validateComparison(optionToReplace, allScenarios[x].id, matchedScenarios)){

        fetchNewScenario.id = allScenarios[x].id;
        fetchNewScenario.scenario = allScenarios[x].scenario;
        break;
      }
    }
  }
  if(fetchNewScenario.id == null){
    alert('There are no more matches');
  }
  return {
    id: fetchNewScenario.id,
    scenario: fetchNewScenario.scenario
  };
}

/** 
 * validateComparison
 * @param {obj} chosenOption voted scenario
 * @param {obj} newMatch new selected match
 * @param {obj} oldMatches all previous matches
 */
function validateComparison(chosenOption, newMatch, oldMatches){
  var x = oldMatches.length;

  for(var i = 0; i < x; i++){
    if(oldMatches[i].includes(chosenOption) && oldMatches[i].includes(newMatch)){
      return false;
    }
  }
  return true;
}

/**
 * fetchScenario
 * @param {num} id scenario is
 */
export function fetchScenario(id){
  var allScenarios = JSON.parse(localStorage.getItem('scenarios'));
  for(let i = 0; i < allScenarios.length; i++){
    if(allScenarios[i].id === id){
      return allScenarios[i].scenario;
    }
  }
  return false;
}

/**
 * compare
 * @param {obj} a first item to compare
 * @param {obj} b second item to compare
 */
export function compare(a, b){
  const votesA = a.cnt;
  const votesB = b.cnt;

  let comparison = 0;
  if(votesA < votesB){
    comparison = 1;
  }else{
    comparison = -1;
  }

  return comparison;
}