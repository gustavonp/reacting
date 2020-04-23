import React, {useContext} from 'react';
import { ConfigContext } from '../App';

export const ScenarioButton = props =>{
  const context = useContext(ConfigContext);

  if(context.isDebugActivate){
    return(
      <button
        type="button"
        id={props.buttonId}
        onClick={() => props.onClick(props.scenarioId)}
      >
        {props.scenarioDescription} = {props.scenarioId}
      </button>
    );
  }else{
    return(
      <button
        type="button"
        id={props.buttonId}
        onClick={() => props.onClick(props.scenarioId)}
      >
        {props.scenarioDescription}
      </button>
    );
  }
  
};

export default ScenarioButton;