import React from 'react';

export const ScenarioButton = props =>(
  <button
    type="button"
    id={props.buttonId}
    onClick={() => props.onClick(props.scenarioId)}
  >
    {props.scenarioDescription} = {props.scenarioId}
  </button>
);

export default ScenarioButton;