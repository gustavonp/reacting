import React, { useState } from 'react';
import { FetchScenarioRow, FetchCategories } from "../../utilities/utilities";
import { useHistory, useParams } from "react-router-dom";
import { EditScenarios } from '../../services/database';

export const SubmitForm = props =>{

  let params = { 'scenarioId': null};
  params = useParams();
  
  let categories = FetchCategories(); 
  let scenario = 'scenarioId' in params ? FetchScenarioRow(params.scenarioId) : null;
  let history = useHistory();
  
  const [tempId, setTempId] = useState(props.url === 'add' ? null : scenario.id);
  const [tempInput, setTempInput] = useState({value: ''});
  const [tempOption, setTempOption] = useState({value: ''});
  const [scenarioEnabled, setScenarioEnabled ] = useState(true);

  function handleChangeInput(event) {
    switch(event.target.className) {
      case 'Scenario':
        return setTempInput({value: event.target.value});
      case 'Category':
        return setTempOption({value: event.target.value});
      case 'Enable':
        return setScenarioEnabled(scenarioEnabled ? false : true);
      default:
        event.preventDefault();
        let UpdatedScenario = {
          'id' : tempId,
          'scenario' : tempInput.value,
          'category' : tempOption.value ? tempOption.value : '0',
          'active' : scenarioEnabled
        }
    
        EditScenarios(props.url === 'add' ? 'Create' : 'Update', UpdatedScenario);
        props.setDatabaseUpdate();

        // props.setNewScenario(UpdatedScenario);
        history.push(props.url === 'add' ? '/AppAdmin/' : '/AppAdmin/edit');

        return false
    }
  };

  if(props.url === 'add'){
    /**
     * ADD
     */
    return(
      <div>
      <form>
          <label>Scenario:</label>
          <input type="text" className="Scenario" value={tempInput.value} onChange={handleChangeInput} />
  
          <label>Category:</label>
          <select value={tempOption.value} className="Category" onChange={handleChangeInput} >
            {categories.map(category =>
              <option 
                key={category.id}
                value={category.id}
              >{category.category}</option>
            )}
          </select>
  
          <label>Enable:</label>
          <input type="checkbox" className="Enable" checked={scenarioEnabled} onChange={handleChangeInput}>
          </input>
          <label>Save:</label>
          <button onClick={handleChangeInput} > Add + </button>
        </form>
      </div>
    );
  }else{
    /**
     * --EDIT
     */

    if(scenario.id !== tempId.value){
      setTempId({value: scenario.id});
      setTempInput({value: scenario.scenario});
      setTempOption({value: scenario.category});
      setScenarioEnabled(scenario.active);
    }

    return(
      <div>
        <br/>
        <form>
          <label>Scenario:</label>
          <input type="text" className="Scenario" value={tempInput.value} onChange={handleChangeInput} />
  
          <label>Category:</label>
          <select value={tempOption.value} className="Category" onChange={handleChangeInput} >
            {categories.map(category =>
              <option 
                key={category.id}
                value={category.id}
              >{category.category}</option>
            )}
          </select>
  
          <label>Enable:</label>
          <input type="checkbox" className="Enable" checked={scenarioEnabled} onChange={handleChangeInput}>
          </input>
          <label>Save:</label>
          <button onClick={handleChangeInput} > Add + </button>
        </form>
      </div>
    ); 
  }
};

export default SubmitForm;