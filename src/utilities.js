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
  //- Grab both the voted scenario and the discarted scenario
  //- Fetch a new pair for the voted scenario that is not inside the array of previous matches

  //- if all combinations with the voted scenario were made, switch it with the discarted scenario
  //- Fetch a new pair for the discarted scenario that is not inside the array of the previous matches

  // - if all combinations with the discarted scenario were made, randomly select a new pair

  // - if all possible combinations were made, finish the game.

  let x = 0;
  var fetchNewScenarios = {
    id1: null,
    scenario1: '',
    id2: null,
    scenario2: ''
  };

  const allScenarios = JSON.parse(localStorage.getItem('scenarios'));
  shuffleScenarios(allScenarios);


  for(x = 0; x < allScenarios.length; x++){
    if(allScenarios[x].id !== chosenOption && allScenarios[x].id !== optionToReplace){  //if new scenario is different from the voted scenario and different from the dircarded scenario
      if(validateComparison(chosenOption, allScenarios[x].id, matchedScenarios)){

        console.log('new match');
        fetchNewScenarios.id1 = chosenOption;
        fetchNewScenarios.scenario1 = fetchScenario(chosenOption);
        fetchNewScenarios.id2 = allScenarios[x].id;
        fetchNewScenarios.scenario2 = allScenarios[x].scenario;
        break;
      }
    }
  }
  
  if(fetchNewScenarios.id1 == null){
    for(x = 0; x < allScenarios.length; x++){
      if(allScenarios[x].id !== chosenOption && allScenarios[x].id !== optionToReplace){
        if(validateComparison(optionToReplace, allScenarios[x].id, matchedScenarios)){

          console.log('new pair with discarted');
          fetchNewScenarios.id1 = optionToReplace;
          fetchNewScenarios.scenario1 = fetchScenario(optionToReplace);
          fetchNewScenarios.id2 = allScenarios[x].id;
          fetchNewScenarios.scenario2 = allScenarios[x].scenario;
          break;
        }
      }
    }
  }

  if(fetchNewScenarios.id1 == null){
    console.log('new pair');
    var newPair = fetchNewPair(matchedScenarios);
    if(!newPair.id1){
      alert('There are no more combinations available');
      //Enough function
    }
  }

  return fetchNewScenarios;
}

/**
 * fetchNewPair
 * @param {obj} matchedScenarios all previously matched scenarios
 */
function fetchNewPair(matchedScenarios) {
  let x = 0;

  const allScenarios = JSON.parse(localStorage.getItem('scenarios'));
  shuffleScenarios(allScenarios);

  var newScenario = {
    id1: null,
    scenario1: '',
    id2: null,
    scenario2: ''
  }

  for(x = 0; x < allScenarios.length - 1; x++){
    
    if(validateComparison(allScenarios[x].id, allScenarios[x+1].id, matchedScenarios)){

      newScenario.id1 = allScenarios[x].id;
      newScenario.scenario1 = allScenarios[x].scenario;
      newScenario.id2 = allScenarios[x+1].id;
      newScenario.scenario2 = allScenarios[x+1].scenario;
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
function validateComparison(chosenOption, newMatch, oldMatches){
  let x = oldMatches.length;
  for(let i = 0; i < x; i++){
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
  const allScenarios = JSON.parse(localStorage.getItem('scenarios'));
  const { scenario } = allScenarios.find(c => c.id === id);
  return scenario;
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