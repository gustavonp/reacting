import React from 'react';
import './style.css';
import { shuffleScenarios, reshuffleScenarios } from '../utilities';


export default class MainProgram extends React.Component {

  constructor(props) {
    super(props);

    // Set the initial State of the App
    this.state = {
      matches: [],
      votes: [],
      chosen: null,
      turns: 0
    }
  }

  handleClick(choice, replace) {

    this.state.matches.push([choice, replace]);
    //this.state.votes //Hold this for now.
    this.state.chosen = choice;
    this.state.turns++;

    /*
    console.log('- - Data Control - -');
    console.log(this.state.matches);
    console.log(this.state.votes);
    console.log(this.state.chosen);
    console.log(this.state.turns);
    console.log('- - - - - - - - - - ');
    */

    var newScenarios = [];
    if (document.getElementById('optionA').value == choice) {
      newScenarios = reshuffleScenarios(choice, replace, document.getElementById('optionA'), this.state.matches);
      //  }else if(document.getElementById('optionB').value == choice){
    } else {
      newScenarios = reshuffleScenarios(choice, replace, document.getElementById('optionB'), this.state.matches);
    }

    //Find out why the code is entering twice on the renderOptions functions when it's being called with setState.
    this.setState(this.renderOptions(newScenarios[0], newScenarios[1], 1)); 
    
    console.log('Finish handleClick');
  }

  renderOptions(scenarioOne, scenarioTwo, myTeste = 0) {

    console.log('Entered renderOptions');

    return (
      <div className="Scenarios">
        <div className="caseA">
          <button
            id="optionA"
            type="button"
            value={scenarioOne.id}
            onClick={() => this.handleClick(scenarioOne.id, scenarioTwo.id)}
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
            onClick={() => this.handleClick(scenarioTwo.id, scenarioOne.id)}
          >
            {scenarioTwo.scenario}
          </button>
        </div>
      </div>
    );
  }

  render() {
    var scenarios = JSON.parse(localStorage.getItem('scenarios'));
    shuffleScenarios(scenarios);

    return (
      <div className="MainProgram">
        <p>Which one is the worst?</p>
        <center>{this.renderOptions(scenarios[0], scenarios[1])}</center>
      </div>
    );
  }
}