import React from 'react';
import SetScore from './SetScore';
import ScenarioButton from './ScenarioButton';

export const RenderOptions = props =>{
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

export default RenderOptions;