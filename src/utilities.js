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
 * @param {obj} pressedButton pressedButton button
 * @param {obj} matchedScenarios all previously matched scenarios
 */
export function reshuffleScenarios (chosenOption, optionToReplace, pressedButton, matchedScenarios){

  //handleClick() content changed, need to refactor this function in order to work properly

  var toTrade = ((pressedButton.id === 'optionA') ? 'optionB' : 'optionA');
  var allScenarios = JSON.parse(localStorage.getItem('scenarios')); 
  
  var newScenarioOne = {
      id: null,
      scenario: ''
  },
      newScenarioTwo = {
      id: null,
      scenario: ''
  };

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

  if(toTrade === 'optionA'){
    newScenarioTwo.id = chosenOption;
    newScenarioTwo.scenario = pressedButton.text;

    newScenarioOne.id = fetchNewScenario.id;
    newScenarioOne.scenario = fetchNewScenario.scenario;
  }else{
    newScenarioOne.id = chosenOption;
    newScenarioOne.scenario = pressedButton.text;

    newScenarioTwo.id = fetchNewScenario.id;
    newScenarioTwo.scenario = fetchNewScenario.scenario;
  }

  return [newScenarioOne, newScenarioTwo];
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
