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
    if(allScenarios[x].id != chosenOption && allScenarios[x].id != optionToReplace){
      if(validateComparison(chosenOption, allScenarios[x].id, matchedScenarios)){

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
