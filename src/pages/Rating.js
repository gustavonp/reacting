import React, { useState, useEffect, useContext } from "react";
import { Header } from '../elements/Header';
import "../MainProgram/style.css";
import {
  getFirstMatch,
  reshuffleScenarios,
  fetchScenario,
  compare
} from "../utilities";
import { ConfigContext } from '../App';
import RenderOptions from '../utilities/RenderOptions';
import Enough from '../utilities/Enough';

  /*
  TO DO
  - Try to add some of the onScenarioClick responsibilities to useEffect
  - Can setNewRating be a useReduce?
  - Apply useContext before rendering

  - create a useState at the Enough! button, so it work work if it's less than 5 votes;
  */

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
  
export const Rating = props =>{
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

  const context = useContext(ConfigContext);
  console.log(context.IsDatabaseInitialized);

  const onScenarioClick = (choice) =>{
    const optionToReplace = 
      choice === nextMatch.firstItem.id
        ? nextMatch.secondItem.id
        : nextMatch.firstItem.id;

    var newMatch = [...matches, [choice, optionToReplace]];

    var voteCounter = [...votes, choice];
    voteCounter.sort((a, b) => a - b);

    var newScenario = reshuffleScenarios(choice, optionToReplace, newMatch);
    
    if (!newScenario) {
      setRatingEnd(true);
    }else{
      var newObject = setNewPairObject(newScenario);
    }

    setNewRating(newMatch, newObject, voteCounter, choice);
  };

  const setNewPairObject = (newScenario) =>{
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
    return({
      firstItem: firstItem,
      secondItem: secondItem
    });
  }

  return(
    <>
      <Header />
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
    </>
  );
};

export default Rating;