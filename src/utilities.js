const scenariosFromDB = JSON.parse(localStorage.getItem("scenarios"));

/**
 * Get the first game match
 */
export function getFirstMatch() {
  var scenarios = scenariosFromDB;
  shuffleScenarios(scenarios);
  return {
    firstItem: scenarios[0],
    secondItem: scenarios[1]
  };
}

/**
 * Get the next new match
 */
export function getNextMatch() {
  var scenarios = scenariosFromDB;
  var x,
    y = null;

  for (var i = 0; i < scenarios.length; i++) {
    if (scenarios[i].id === this.state.nextMatch.firstItem) {
      x = scenarios[i];
    }
    if (scenarios[i].id === this.state.nextMatch.secondItem) {
      y = scenarios[i];
    }
  }
  return [x, y];
}

/**
 * Set next match
 * @param {obj} firstChoice first chosen option
 * @param {obj} secondChoice second chosen option
 */
export function setNextMatch(firstChoice, secondChoice) {
  var newObject = {
    firstItem: firstChoice,
    secondItem: secondChoice
  };
  this.setState({
    nextMatch: newObject
  });
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

  const allScenarios = scenariosFromDB;
  const arrNewSelections = allScenarios.filter(as => as.id !== chosenOption && as.id !== optionToReplace);
  const newTry = matchedScenarios.filter(ms => ms.includes(chosenOption));
  var newArrToCrop = arrNewSelections;

  for(let j = 0; j < newTry.length; j++){
    newArrToCrop = newArrToCrop.filter(nar => nar.id !== newTry[j][0] && nar.id !== newTry[j][1])
  }

  if(newArrToCrop.length < 1){
    console.log('bring the next one');
      for (let y = 0; y < arrNewSelections.length; y++) {
        if (
          validateComparison(
          optionToReplace,
          arrNewSelections[y].id,
          matchedScenarios)
        ) {
          fetchNewScenarios.id1 = optionToReplace;
          fetchNewScenarios.scenario1 = fetchScenario(optionToReplace);
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
        fetchNewScenarios.scenario1 = fetchScenario(chosenOption);
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
  const allScenarios = scenariosFromDB;
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
  return checkMatched.length == 0 ? true : false ;
}

/**
 * fetchScenario
 * @param {num} id scenario is
 */
export function fetchScenario(id) {
  const allScenarios = scenariosFromDB;
  const { scenario } = allScenarios.find(c => c.id === id);
  return scenario;
}

/**
 * compare
 * @param {obj} a first item to compare
 * @param {obj} b second item to compare
 */
export function compare(a, b) {
  const votesA = a.counter;
  const votesB = b.counter;

  let comparison = votesA < votesB ? 1 : -1;

  return comparison;
}
