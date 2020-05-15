
import React from 'react';
import SubmitForm from '../elements/SubmitForm';

export function Add(props) {
  
  return(
    <SubmitForm
      url={'add'} 
      setNewScenario={props.setNewScenario}
      setDatabaseUpdate={props.setDatabaseUpdate}
    />
  );
}

export default Add