import React from 'react';
import './style.css';
import { shuffleScenarios, reshuffleScenarios, fetchScenario, compare } from '../utilities';


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
      if(scenarios[i].id === this.state.nextMatch.firstItem){
        x = scenarios[i];
      }
      if(scenarios[i].id === this.state.nextMatch.secondItem){
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
    var replace = (choice === this.state.nextMatch.firstItem.id) ? this.state.nextMatch.secondItem.id : this.state.nextMatch.firstItem.id;
    
    var newMatch = this.state.matches;
    newMatch.push([choice, replace]);
    var votes = this.state.votes;
    votes.push(choice);
    votes.sort((a, b) => a - b); //lovely ES6 way to fix sort(); function from alphabetically to numerically 
    
    var newScenario = reshuffleScenarios(choice, replace, newMatch);

    
    if(choice === newScenario.id2){
      // var firstItem = this.state.nextMatch.firstItem;
      var firstItem = {
        id: newScenario.id2,
        scenario: newScenario.scenario2
      };
      var secondItem = {
        id: newScenario.id1,
        scenario: newScenario.scenario1
      }
    }else{
      // secondItem = this.state.nextMatch.secondItem;
      var secondItem = {
        id: newScenario.id2,
        scenario: newScenario.scenario2
      };
      var firstItem = {
        id: newScenario.id1,
        scenario: newScenario.scenario1
      }
    }


    var newObject = {
      firstItem: firstItem,
      secondItem: secondItem
    };

    this.setState({
      matches: newMatch,
      nextMatch: newObject,
      votes: votes,
      chosen: choice,
      turns: (this.state.turns + 1)
    });
  }

  renderOptions(scenarioOne, scenarioTwo) {
    if(!this.state.enough){
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
    }else{
      return(
        <div className="Scenarios">
          <div className="caseA"></div>
          <div className="caseB"></div>
          <div className="enoughResults">
            <p>Enough</p>
          </div>
          {this.renderScore()}
        </div>
      );
    }
  }

  enoughButton(){
    this.setState({
      enough: true
    });
  }

  renderScore() {
    let current = null;
    let cnt = 0;
    let scoring = [];
    let scoreboard = [];

    for(let i = 0; i < this.state.turns; i++){
      if(this.state.votes[i] !== current){
        if(cnt > 0){
          scoring.push(
            {
              current: current, 
              cnt: cnt
            }
          );

        }
        current = this.state.votes[i];
        cnt = 1;
      }else{
        cnt++;
      }
    }
    if (cnt > 0) {
      scoring.push(
        {
          current: current, 
          cnt: cnt
        }
      );
    }
    
    scoring.sort(compare);

    scoring.forEach(function(entry) {
      scoreboard.push(
        <div key={entry.current}>
          <b>{fetchScenario(entry.current)}</b>: has {entry.cnt} {entry.cnt === 1 ? 'vote.' : 'votes.'}
        </div>
      )
    });

    return scoreboard;
  }

  render() {
    if(this.state.enough === true){
      // console.log('enough');
    }else{
      // console.log('continue');
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