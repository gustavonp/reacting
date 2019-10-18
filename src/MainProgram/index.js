import React from "react";

import "./style.css";
import { shuffle, reshuffle } from "../utilities";


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
    let scenes = JSON.parse(localStorage.getItem("scenarios"));
    this.state.chosen = choice;
    this.state.turns++;
    this.state.matches.push([choice, replace]);

    /*
     */
    console.log("choice = " + choice);
    console.log("A = " + document.getElementById("optionA").value);
    console.log("B = " + document.getElementById("optionB").value);

    var took = [];
    if (document.getElementById("optionA").value == choice) {
      took = reshuffle(choice, replace, document.getElementById("optionA"));
      //  }else if(document.getElementById('optionB').value == choice){
    } else {
      took = reshuffle(choice, replace, document.getElementById("optionB"));
    }

    //console.log(took[0]);

    var thing1 = {
      id: parseInt(took[0]["id"]),
      scenario: took[0]["scenario"]
    };

    var thing2 = {
      id: parseInt(took[1]["id"]),
      scenario: took[1]["scenario"]
    };

    this.renderOptions(thing1, thing2);
    // localStorage.setItem('scenarios', JSON.stringify(scenarios));
  }

  renderOptions(scenarioOne, scenarioTwo) {
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
    var scenarios = JSON.parse(localStorage.getItem("scenarios"));
    shuffle(scenarios);

    return (
      <div className="MainProgram">
        <p>Which one is the worst?</p>
        <center>{this.renderOptions(scenarios[0], scenarios[1])}</center>
      </div>
    );
  }
}