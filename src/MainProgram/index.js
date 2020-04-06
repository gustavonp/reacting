import React, { useState, useEffect } from "react";
import "./style.css";
import {
  getFirstMatch,
  reshuffleScenarios,
  fetchScenario,
  compare
} from "../utilities";

export default class StartRating extends React.Component {
  render(){
    return(
      <StartProgram/>
    );
  }
};

const useRatingState = () => {
  const [isEnough, setIsEnough] = useState(false);
  const [matches, setMatches] = useState([]);
  const [votes, setVotes] = useState([]);
  const [chosen, setChosem] = useState();
  const [turns, setTurns] = useState(0);
  const [nextMatch, setNextMatch] = useState(getFirstMatch());

  useEffect(() => {
    return () => {};
  });

  const setRatingEnd = () => {
    setIsEnough(true);
  };

  const setNewRating = (newMatch, newObject, votes, choice) => {
    setMatches(newMatch);
    setNextMatch(newObject);
    setVotes(votes);
    setChosem(choice);
    setTurns(turns + 1);
  };

  const setRenderScore = () =>{
    let currentScenario = null;
    let counter = 0;
    let scoring = [];
    let scoreBoard = [];
    
    for (let i = 0; i < turns; i++) {
      if (votes[i] !== currentScenario) {
        if (counter > 0) {
          scoring.push({
            currentScenario: currentScenario,
            counter: counter
          });
        }
        currentScenario = votes[i];
        counter = 1;
      } else {
        counter++;
      }
    }
    if (counter > 0) {
      scoring.push({
        currentScenario: currentScenario,
        counter: counter
      });
    }
  
    scoring.sort(compare);

    return (
      <ul>
        {scoring.map(podium =>
          <div key={podium.currentScenario}>
          {fetchScenario(podium.currentScenario)}: has {podium.counter} votes
          </div>)}
      </ul>
    );
  };

  return {
    isEnough, matches, votes, chosen, turns, nextMatch, setRatingEnd, setNewRating, setRenderScore
  }
};


const StartProgram = props =>{
  const {
    isEnough,
    matches,
    votes,
    chosen,
    turns,
    nextMatch,
    setRatingEnd,
    setNewRating,
    setRenderScore
  } = useRatingState();

  const onScenarioClick = (choice) =>{
    const optionToReplace = 
      choice === nextMatch.firstItem.id
        ? nextMatch.secondItem.id
        : nextMatch.firstItem.id;

    var newMatch = [...matches, [choice, optionToReplace]];

    var voteCounter = [...votes, choice];
    voteCounter.sort((a, b) => a - b); //lovely ES6 way to fix sort(); function from alphabetically to numerically
  
    var newScenario = reshuffleScenarios(choice, optionToReplace, newMatch);
    
    if (!newScenario) {
      setRatingEnd(true);
    }else{
      if (nextMatch.secondItem.id === newScenario.id1) {
        var firstItem = {
          id: newScenario.id2,
          scenario: newScenario.scenario2
        };
        var secondItem = {
          id: newScenario.id1,
          scenario: newScenario.scenario1
        };
      } else {
        var secondItem = {
          id: newScenario.id2,
          scenario: newScenario.scenario2
        };
        var firstItem = {
          id: newScenario.id1,
          scenario: newScenario.scenario1
        };
      }

      var newObject = {
        firstItem: firstItem,
        secondItem: secondItem
      }
    }

    setNewRating(newMatch, newObject, voteCounter, choice);
  };



  return(
    <div className="MainProgram">
      <p>Which one is the worst?</p>
      <center>
        <RenderOptions 
          firstItem={nextMatch.firstItem}
          secondItem={nextMatch.secondItem} 
          isEnough={isEnough} 
          onScenarioClick={onScenarioClick}
          setRenderScore={setRenderScore}
        />
        <div>
          <Enough onClick={setRatingEnd} />
        </div>
      </center>
    </div>
  );
};


const RenderOptions = props =>{
  if(!props.isEnough){
    return(
      <div className="Scenarios">
        <div className="caseA">
          <ScenarioButton
            buttonId={'optionA'}
            scenarioDescription={props.firstItem.scenario}
            scenarioId={props.firstItem.id}
            onClick={props.onScenarioClick}
          />
        </div>
        <div className="or">OR</div>
        <div className="caseB">
          <ScenarioButton
            buttonId={'optionB'}
            scenarioDescription={props.secondItem.scenario}
            scenarioId={props.secondItem.id}
            onClick={props.onScenarioClick}
          />
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
        {SetScore(props.setRenderScore)}
      </div>
    );
  }
};

const ScenarioButton = props =>(
  <button
    type="button"
    id={props.buttonId}
    onClick={() => props.onClick(props.scenarioId)}
  >
    {props.scenarioDescription}
  </button>
);

const Enough = props =>(
  <>
    <button
      className="enough-bt"
      onClick={() => props.onClick()}
    >
      Enough!
    </button>
  </>
);

const SetScore = (props) =>{
  return(
    <div className="score">
      {props()}
    </div>
  );
};


const MainProgram = () =>{
  const [ratingId, setRatingId] = useState(1);
  return <StartRating key={ratingId} startNewRating={setRatingId(ratingId + 1)} />
};