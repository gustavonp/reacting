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

    this.state.matches.push([choice, replace]);
    //this.state.votes //Hold this for now.

    var newScenarios = [];
    newScenarios = reshuffleScenarios(choice, replace, chosenButton, this.state.matches);

    this.setNextMatch(newScenarios[0], newScenarios[1]);

    this.setState({
      chosen: choice,
      turns: this.state.turns++
    });
  }

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