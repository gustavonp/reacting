export function shuffle (array) {
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




export function reshuffle (choice, replace, pressed){

  //ver pq não está trocando os dois botões
  var toTrade = ((pressed.id == 'optionA') ? "optionB" : "optionA");
  var scenarios = JSON.parse(localStorage.getItem('scenarios'));
  shuffle(scenarios);

  console.log(choice);  
  console.log(replace);  
  console.log(pressed);  

  console.log('entrei');  
  
  var newScenarioOne = [];
  newScenarioOne['id'] = choice;
  newScenarioOne['scenario'] = pressed.innerHTML;


  var x = 0
  for(x = 0; x < scenarios.length; x++){
    if(scenarios[x].id != choice && scenarios[x].id != replace){
     
      var newScenarioTwo = [];
      newScenarioTwo['id'] = scenarios[x].id;
      newScenarioTwo['scenario'] = scenarios[x].scenario;

      
    //  console.log(document.getElementById(toTrade));
      
    //  App.renderOptions(newScenarioOne, newScenarioTwo);
    document.getElementById(toTrade).value = scenarios[x].id;
    document.getElementById(toTrade).innerHTML = scenarios[x].scenario;
    document.getElementById(toTrade).id = document.getElementById(toTrade).id;
    /*
      */  

      break;
    }

  //  localStorage.setItem('scenarios', JSON.stringify(scenarios));
  }

  return [newScenarioOne, newScenarioTwo];
}
