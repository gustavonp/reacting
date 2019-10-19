import React from 'react';
import './style.css';
import { shuffleScenarios, reshuffleScenarios } from '../utilities';


export default class MainProgram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      votes: [],
      chosen: null,
      turns: 0
    };
  }

  handleClick(choice, replace) {
    let scenes = JSON.parse(localStorage.getItem('scenarios'));
    this.state.chosen = choice;
    this.state.turns++;
    this.state.matches.push([choice, replace]);

    var newScenarios = [];
    if (document.getElementById('optionA').value == choice) {
      newScenarios = reshuffleScenarios(choice, replace, document.getElementById('optionA'));
      //  }else if(document.getElementById('optionB').value == choice){
    } else {
      newScenarios = reshuffleScenarios(choice, replace, document.getElementById('optionB'));
    }

    //Find out why the code is entering twice on the renderOptions functions when it's being called with setState.
    this.setState(this.renderOptions(newScenarios[0], newScenarios[1]));
  }

  renderOptions(scenarioOne, scenarioTwo) {

    console.log('- - -');
    console.log(scenarioOne);
    console.log(scenarioTwo);

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