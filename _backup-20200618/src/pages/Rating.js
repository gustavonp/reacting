import React, { useState, useEffect, useContext, useReducer } from "react";
import { Header } from '../elements/Header';
import "../style/rating.css";
import {
  GetFirstMatch,
  reshuffleScenarios,
  FetchScenario,
  FetchCategories,
  FetchCategory
} from "../utilities/utilities";
import { ConfigContext } from '../App';
import RenderOptions from '../utilities/RenderOptions';
import Enough from '../utilities/Enough';

/**
 * TO DO--
 * 
 * sum all category and get its percentage
 */

const matchReducer = (state, action) => {
  switch (action.type){
    case 'setNewRating':{
      return action.data;
    }
    default:{
      return GetFirstMatch();
    }
  }
};

const scoreReducer = (state, action) => {
  function setRenderScore(matches){
    let scoreBoard = {};

    matches.map(match => {
      if(scoreBoard[match[0]]){
        scoreBoard[match[0]] += 1;
      }else{
        scoreBoard[match[0]] = 1;
      }
    }
    );

    const scoring = (scoreBoard) => {
      let arr = [];
      for (let [key, value] of Object.entries(scoreBoard)){
        arr.push([value, key]);
      }
      return arr.sort((a, b) => b[0] - a[0]);
    }

    return scoring(scoreBoard);
  }
  switch (action.type){
    case 'score':{
      return state;
    }
    case 'setFinalScore':{
      return setRenderScore(action.data);
    }
    default:{
      return state;
    }
  }
};

const setCategoriesObj = () =>{
  let categories = {}
  FetchCategories().map(cat => {
    categories[cat.category] = { 'id': cat.id, 'percentage' : 0 }
  });
  return categories
}

const useRatingState = () => {
  const [isEnough, setIsEnough] = useState(false);
  const [matches, setMatches] = useState([]);
  const [votes, setVotes] = useState([]);
  const [chosen, setChosem] = useState(null);
  const [turns, setTurns] = useState(0);
  const [nextMatch, setNextMatch] = useReducer(matchReducer, GetFirstMatch());
  const [score, setScore] = useReducer(scoreReducer, {});
  const [categoryPercentage, setCategoryPercentage] = useState(setCategoriesObj())

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

    setCategoryPonctuaton();

    setScore({
      type: 'setFinalScore',
      data: matches
    });
  };

  const setCategoryPonctuaton = () => {
    let tempCategoryPercentage = categoryPercentage;
    
    votes.map(vote =>{
      let tempObj = FetchCategory(vote);
      tempCategoryPercentage[tempObj.category].percentage += 1;
    });

    FetchCategories().map(category =>{
      tempCategoryPercentage[category.category].percentage = (tempCategoryPercentage[category.category].percentage / turns) * 100;
    });

    setCategoryPercentage(tempCategoryPercentage);
  }

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
    return (
      <div>
        <ul>
          {score.map(podium =>
            <div key={podium[1]}>
            {FetchScenario(podium[1])}: has {podium[0]} votes
            </div>)}
        </ul>
        <hr/>
        <ul>
          {FetchCategories().map(c =>
            <li key={c.category}>
              {c.category}: {categoryPercentage[c.category].percentage}%
            </li>
          )}
        </ul>
      </div>
    );
  };

  return {
    isEnough, matches, turns, nextMatch, categoryPercentage, setRatingEnd, setMadeChoice, setNextTurn, setUpdatedMatches, setRenderScore
  }
};
  
export const Rating = () =>{
  const {
    isEnough,
    matches,
    turns,
    nextMatch,
    categoryPercentage,
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
              categoryPercentage={categoryPercentage}
            />
            <div>
              <Enough onClick={setRatingEnd} turns={turns} isEnough={isEnough} />
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