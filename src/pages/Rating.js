import React, { useState, useEffect, useContext, useReducer } from "react";
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
  - optimize setRenderScore function
  */

const matchReducer = (state, action) => {
  switch (action.type){
    case 'setNewRating':{
      return action.data;
    }
    default:{
      return getFirstMatch();
    }
  }
};

const useRatingState = () => {
  const [isEnough, setIsEnough] = useState(false);
  const [matches, setMatches] = useState([]);
  const [votes, setVotes] = useState([]);
  const [chosen, setChosem] = useState(null);
  const [turns, setTurns] = useState(0);
  const [nextMatch, setNextMatch] = useReducer(matchReducer, getFirstMatch());

  useEffect(() => {
    if(chosen !== null){
      let newVoteSum = [...votes, chosen];
      newVoteSum.sort((a, b) => a - b);
      setVotes(newVoteSum);
      setTurns(turns + 1);          
      setChosem(null);
    }
    return () => {};
  }, [chosen, turns, votes]); //needs to return this to avoid infinite returns

  const setRatingEnd = () => {
    setIsEnough(true);
  };

  const setNewRating = (newMatch) => {
    setNextMatch({
      type: 'setNewRating',
      data: newMatch
    });
  };

  const setMadeChoice = (choice) => {
    setChosem(choice);
    return choice === nextMatch.firstItem.id ? nextMatch.secondItem.id : nextMatch.firstItem.id;
  };

  const setUpdatedMatches = (newMatch) =>{
    setMatches(newMatch);
  };

  const setNextTurn = (choice, optionToReplace) =>{
    let newScenario = reshuffleScenarios(choice, optionToReplace, matches);
    if (!newScenario) {
      setRatingEnd(true);
    }else{
      setNewRating(setNewPairObject(newScenario));
    }
  };

  const setNewPairObject = (newScenario) =>{
    let optionA = {
      id: newScenario.id1,
      scenario: newScenario.scenario1
    }
    let optionB = {
      id: newScenario.id2,
      scenario: newScenario.scenario2
    }
    
    if(nextMatch.secondItem.id === newScenario.id1){
      return {
        firstItem: optionB,
        secondItem: optionA
      }
    }else{
      return {
        firstItem: optionA,
        secondItem: optionB
      }
    }
  };

  const setRenderScore = () =>{
    let scoring = [];
    let scoreBoard = {};

    matches.map(match => {
      if(scoreBoard[match[0]]){
        scoreBoard[match[0]] += 1;
      }else{
        scoreBoard[match[0]] = 1;
      }
      }
    );

    scoring = sortScore(scoreBoard);

    function sortScore(unorganizedScore){
      let arr = [];
      for (let [key, value] of Object.entries(unorganizedScore)){
        arr.push([value, key]);
      }
      return arr.sort((a, b) => b[0] - a[0]);
    }

    return (
      <ul>
        {scoring.map(podium =>
          <div key={podium[1]}>
          {fetchScenario(podium[1])}: has {podium[0]} votes
          </div>)}
      </ul>
    );
  };

  return {
    isEnough, matches, turns, nextMatch, setRatingEnd, setMadeChoice, setNextTurn, setUpdatedMatches, setRenderScore
  }
};
  
export const Rating = () =>{
  const {
    isEnough,
    matches,
    turns,
    nextMatch,
    setRatingEnd,
    setMadeChoice,
    setNextTurn,
    setUpdatedMatches,
    setRenderScore
  } = useRatingState();

  const context = useContext(ConfigContext);

  const onScenarioClick = (choice) =>{
    const optionToReplace = setMadeChoice(choice);

    setUpdatedMatches([...matches, [choice, optionToReplace]]);
    
    setNextTurn(choice, optionToReplace);
  };

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
              {context.isDebugActivate === false ? null : (
              <p>{`Turns: ${turns}`}<br/>
              {`Votes: ${matches.map(votes => `${votes[0]} - ${votes[1]} | `)}`}</p>
              )}
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