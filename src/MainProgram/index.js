import React from 'react';
import './style.css';
import { shuffleScenarios, reshuffleScenarios } from '../utilities';


export default class MainProgram extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      nextMatch: this.getFirstMatch(),
      votes: [],
      chosen: null,
      turns: 0,
      enough: false
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
    var replace = (choice == this.state.nextMatch.firstItem.id) ? this.state.nextMatch.secondItem.id : this.state.nextMatch.firstItem.id;
    var newScenario = reshuffleScenarios(choice, replace, this.state.matches);

    if(choice == this.state.nextMatch.firstItem.id){
      var firstItem = this.state.nextMatch.firstItem;
      var secondItem = {
        id: newScenario.id,
        scenario: newScenario.scenario
      }
    }else{
      var secondItem = this.state.nextMatch.secondItem;
      var firstItem = {
        id: newScenario.id,
        scenario: newScenario.scenario
      }
    }

    var newMatch = this.state.matches;
    newMatch.push([choice, replace]);

    var votes = this.state.votes;
    votes.push(choice);
    votes.sort((a, b) => a - b); //lovely ES6 way to fix sort(); function from alphabetically to numerically 

    var newObject = {
      firstItem: firstItem,
      secondItem: secondItem
    };

    this.setState({
      matches: newMatch,
      nextMatch: newObject,
      votes: votes,
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

  enoughButton(){
    this.setState({
      enough: true
    });
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
    if(this.state.enough === true){
      console.log('enough');
    }else{
      console.log('continue');
    }

    return (
      <div className="MainProgram">
        <p>Which one is the worst?</p>
        <center>
          {this.renderOptions(this.state.nextMatch.firstItem, this.state.nextMatch.secondItem)}
          <div>
            <button
            type="button"
            id="optionA"
            onClick={() => this.enoughButton()}
          >Enough!</button>
          </div>
        </center>
      </div>
    );
  }
}