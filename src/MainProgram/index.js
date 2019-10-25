import React from 'react';
import './style.css';
import { shuffleScenarios, reshuffleScenarios } from '../utilities';


export default class MainProgram extends React.Component {

  constructor(props) {
    super(props);
    // Set the initial State of the App
    this.state = {
      matches: [],
      nextMatch: [],
      votes: [],
      chosen: null,
      turns: 0
    }
  }

  setNextMatch(firstChoice, secondChoice){
    // TODO: Avoid changing state directly, you can return the next match as a new array
    //       so you can choose WHEN to setState in other functions, to avoid multiple renders
    this.state.nextMatch.length = 0;
    this.state.nextMatch.push(firstChoice.id, secondChoice.id);
  }

  getNextMatch(){
    var scenarios = JSON.parse(localStorage.getItem('scenarios'));
    var x, y = null;
    
    for(var i = 0; i < scenarios.length; i++){
      if(scenarios[i].id == this.state.nextMatch[0]){
        x = scenarios[i];
      }
      if(scenarios[i].id == this.state.nextMatch[1]){
        y = scenarios[i];
      }
    }
    return [x, y];
  }


  handleClick(choice, replace, chosenButton) {
    // TODO: Avoid changing state directly,  use  var myNewArray = [...this.state.matches];  myNewArray.push([choice, replace]);
    this.state.matches.push([choice, replace]);

    //this.state.votes //Hold this for now.

    var newScenarios = [];
    /* TODO: You might need to refactor this function to accomodate the exclusion of "chosenButton" */
    newScenarios = reshuffleScenarios(choice, replace, chosenButton, this.state.matches);

    /*
      TODO: make this function return a brand new array, and set the match parameter on the setState below 
            because you need the matches already set, you may need to set the state right in the beginning.
    */
    this.setNextMatch(newScenarios[0], newScenarios[1]);

    this.setState({
      chosen: choice,
      turns: this.state.turns++
    });
  }

  /* 
    TODO: on handleClick call:

    - Remove scenarioOne.id, scenarioTwo.id params
    - Remove third option as an object, and make it a simple param:
      handleClick('optionA', scenarioOne.id)


    Since you are not interested in the Click Native Event, your onClick can be simplified to:
    - onClick={this.handleClick(......)}

    If you need the browser native event one day, you can do as:
    - onClick={(e) => this.handleClick(e, .......)}
  */
  renderOptions(scenarioOne, scenarioTwo, myTeste = 0) {
    return (
      <div className="Scenarios">
        <div className="caseA">
          <button
            id="optionA"
            type="button"
            value={scenarioOne.id}
            onClick={() => this.handleClick(scenarioOne.id, scenarioTwo.id, {id:'optionA', 'text':scenarioOne.scenario})}
          >
            {scenarioOne.scenario}
          </button>
        </div>
        <div className="or">OR</div>
        <div className="caseB">
          <button
            id="optionB"
            type="button"
            value={scenarioTwo.id}
            onClick={() => this.handleClick(scenarioTwo.id, scenarioOne.id, {id:'optionB', 'text':scenarioTwo.scenario})}
          >
          {scenarioTwo.scenario}
          </button>
        </div>
      </div>
    );
  }

  render() {
    /*
      TODO:
      Do not set scenario = [] here, avoid creating short lived states in memory,
      instead, use the state to store your Current game state.

      If you need to calculate your nextMatch, you can also store in the state, no worries
    */
    var scenario = [];
    if(this.state.nextMatch.length > 0){
      scenario = this.getNextMatch();
    }else{
      var scenarios = JSON.parse(localStorage.getItem('scenarios'));
      shuffleScenarios(scenarios);
      this.setNextMatch(scenarios[0], scenarios[1]);
      scenario.push(scenarios[0], scenarios[1]);
    }

    return (
      <div className="MainProgram">
        <p>Which one is the worst?</p>
        <center>{this.renderOptions(scenario[0], scenario[1])}</center>
      </div>
    );
  }
}