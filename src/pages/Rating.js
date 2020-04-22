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
  - Can setNewRating be a useReduce?
  */

const useRatingState = () => {
  const [isEnough, setIsEnough] = useState(false);
  const [matches, setMatches] = useState([]);
  const [votes, setVotes] = useState([]);
  const [chosen, setChosem] = useState(null);
  const [turns, setTurns] = useState(0);
  const [nextMatch, setNextMatch] = useState(getFirstMatch());

  useEffect(() => {
    if(chosen){
      let newVoteSum = [...votes, chosen];
      newVoteSum.sort((a, b) => a - b);
      setVotes(newVoteSum);
      setTurns(turns + 1);          
      setChosem(null);
    }
    return () => {};
  });

  const setRatingEnd = () => {
    setIsEnough(true);
  };

  const setNewRating = (newObject) => {
    setNextMatch(newObject);
  };

  const setMadeChoice = (choice) => {
    setChosem(choice);
    return choice === nextMatch.firstItem.id ? nextMatch.secondItem.id : nextMatch.firstItem.id;
  }

  const setUpdatedMatches = (newMatch) =>{
    setMatches(newMatch);
  }

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
    isEnough, matches, votes, turns, nextMatch, setRatingEnd, setNewRating, setMadeChoice, setUpdatedMatches, setRenderScore
  }
};
  
export const Rating = props =>{
  const {
    isEnough,
    matches,
    votes,
    turns,
    nextMatch,
    setRatingEnd,
    setNewRating,
    setMadeChoice,
    setUpdatedMatches,
    setRenderScore
  } = useRatingState();

  const context = useContext(ConfigContext);

  const onScenarioClick = (choice) =>{
    const optionToReplace = setMadeChoice(choice);

    setUpdatedMatches([...matches, [choice, optionToReplace]]);
    
    let newScenario = reshuffleScenarios(choice, optionToReplace, matches);
    
    if (!newScenario) {
      setRatingEnd(true);
    }else{
      var newObject = setNewPairObject(newScenario);
    }

    setNewRating(newObject);
  };

  const setNewPairObject = (newScenario) =>{
    let firstItem, secondItem;
    if (nextMatch.secondItem.id === newScenario.id1) {
      firstItem = {
        id: newScenario.id2,
        scenario: newScenario.scenario2
      };
      secondItem = {
        id: newScenario.id1,
        scenario: newScenario.scenario1
      };
    } else {
      secondItem = {
        id: newScenario.id2,
        scenario: newScenario.scenario2
      };
      firstItem = {
        id: newScenario.id1,
        scenario: newScenario.scenario1
      };
    }
    return({
      firstItem: firstItem,
      secondItem: secondItem
    });
  }

  if(context.IsDatabaseInitialized){
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
              <Enough onClick={setRatingEnd} turns={turns} />
            </div>
          </center>
        </div>
      </>
    );
  }else{
    return(
      <>
        <Header />
        <div className="MainProgram">
          <p>Which one is the worst?</p>
          <center>
            <p>Problem while loading the game</p>
          </center>
        </div>
      </>
    );
  }
};

export default Rating;