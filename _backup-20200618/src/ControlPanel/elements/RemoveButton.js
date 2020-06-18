import React from 'react';
import { EditScenarios } from '../../services/database';

export const RemoveButton = props =>{
  const handleClick = () =>{
    EditScenarios('Delete', props.idToRemove);
    props.setDatabaseUpdate();
  }
  return(
    <>
      <button
        onClick={handleClick}
      >
      Remove
      </button>
    </>
  );
}

export default RemoveButton;