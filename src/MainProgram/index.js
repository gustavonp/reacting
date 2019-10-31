import React from 'react';
import './style.css';
import { shuffleScenarios, reshuffleScenarios } from '../utilities';


export default class MainProgram extends React.Component {

  constructor(props) {
    super(props);
    // Set the initial State of the App
    this.state = {
      matches: [],
      nextMatch: this.getFirstMatch(),
      votes: [],
      chosen: null,
      turns: 0
    }
  }

  getFirstMatch(){
    var scenarios = JSON.parse(localStorage.getItem('scenarios'));
    shuffleScenarios(scenarios);     
    return {
      firstItem: scenarios[0],
      secondItem: scenarios[1]
    };
  }

  getNextMatch(){
    var scenarios = JSON.parse(localStorage.getItem('scenarios'));
    var x, y = null;
    
    for(var i = 0; i < scenarios.length; i++){
      if(scenarios[i].id == this.state.nextMatch.firstItem){
        x = scenarios[i];
      }
      if(scenarios[i].id == this.state.nextMatch.secondItem){
        y = scenarios[i];
      }
    }
    return [x, y];
  }

  setNextMatch(firstChoice, secondChoice){
    var newObject = {
      firstItem: firstChoice,
      secondItem: secondChoice
    }
    this.setState({
      nextMatch: newObject
    });
  }

  handleClick(choice) {
    //this.state.votes //Hold this for now.

    var chosenButton = (choice == this.state.nextMatch.firstItem.id) ? this.state.nextMatch.firstItem : this.state.nextMatch.secondItem;
    var replace = (choice == this.state.nextMatch.firstItem.id) ? this.state.nextMatch.secondItem.id : this.state.nextMatch.firstItem.id;

    var newScenarios = [];
    /* TODO: You might need to refactor this function to accomodate the exclusion of "chosenButton" */
    newScenarios = reshuffleScenarios(choice, replace, chosenButton, this.state.matches);

    var newMatch = this.state.matches;
    newMatch.push([choice, replace]);

    var newObject = {
      firstItem: newScenarios[0].id,
      secondItem: newScenarios[1].id
    };

    this.setState({
      matches: newMatch,
      nextMatch: newObject,
      chosen: choice,
      turns: this.state.turns++
    });
  }

  /* 
    TODO: on handleClick call:

    Since you are not interested in the Click Native Event, your onClick can be simplified to:
    - onClick={this.handleClick(......)}

    G: ReactJS responded with an error when I removed the fat arrow
  */
  renderOptions(scenarioOne, scenarioTwo) {
    return (
      <div className="Scenarios">
        <div className="caseA">
          <button
            type="button"
            id="optionA"
            onClick={() => this.handleClick(scenarioOne.id)}
          >
            {scenarioOne.scenario}
          </button>
        </div>
        <div className="or">OR</div>
        <div className="caseB">
          <button
            type="button"
            id="optionB"
            onClick={() => this.handleClick(scenarioTwo.id)}
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

      G: This would make me add more information on this.state, instead of just two ints I also would have to save two strings.
      Also, React is not letting me set any new state inside render(), how am I supposed to get a new one if this is the first turn?
    */

/*
    var scenario = [];
    if(this.state.nextMatch.firstItem != null){

      scenario = this.getNextMatch();

    }else{

      var scenarios = JSON.parse(localStorage.getItem('scenarios'));
      shuffleScenarios(scenarios);     
      scenario.push(scenarios[0], scenarios[1]);
    }
*/
    return (
      <div className="MainProgram">
        <p>Which one is the worst?</p>
        <center>{this.renderOptions(this.state.nextMatch.firstItem, this.state.nextMatch.secondItem)}</center>
      </div>
    );
  }
}