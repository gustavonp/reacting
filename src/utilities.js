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
 */
export function reshuffleScenarios (chosenOption, optionToReplace, pressedButton, matchedScenarios){

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

  if(toTrade === 'optionA'){
    newScenarioTwo.id = chosenOption;
    newScenarioTwo.scenario = pressedButton.innerHTML;

    newScenarioOne.id = fetchNewScenario.id;
    newScenarioOne.scenario = fetchNewScenario.scenario;
  }else{
    newScenarioOne.id = chosenOption;
    newScenarioOne.scenario = pressedButton.innerHTML;

    newScenarioTwo.id = fetchNewScenario.id;
    newScenarioTwo.scenario = fetchNewScenario.scenario;
  }

  return [newScenarioOne, newScenarioTwo];
}

function validateComparison(chosenOption, newMatch, oldMatches){
  var x = oldMatches.length;

  var arrTemp = [];
  arrTemp.push([chosenOption, newMatch]);
  arrTemp.push([newMatch, chosenOption]);

  for(var i = 0; i < x; i++){
    if(arrTemp[0].join('') == oldMatches[i].join('') || arrTemp[1].join('') == oldMatches[i].join('')){
      return false;
    }
  }

  return true;
}
