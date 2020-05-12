import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, useHistory, Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";

import { GetDatabase } from '../services/database';
import { ConfigContext } from '../App';
import { FetchScenarioRow, FetchCategories } from "../utilities/utilities";


/*
TO DO==
- third, start adding the reducer structure

- onClick Delete, update database to active to switch between true to false;
- create a function that, if it received no id, it'll add a new key, otherwise it'll edit the given ID;
*/


const updateReducer = (model) => {
  console.log(`Edit - Model = ${model}`);
};

const update = (model, action) =>{
  const updates = {
    'CREATE' : '',
    'READ' : '',
    'UPDATE' : updateReducer(model),
    // 'UPDATE' : (model) => Object.assign(model,),
    'DELETE' : console.log(`Delete - Model = ${model} | Action = ${action}`)
  };
  return (updates[action.type] || (() => model)) (model);
};


const createStore = (reducer) => {  //hooks
  let dataBase = GetDatabase();
  let idToEdit = null;
  let internalState = 0;
  let handlers = [];
  return {
    dispatch: (intent, idValue) => {
      idToEdit = idValue;
      console.log(idToEdit);
      // internalState = reducer(idValue, intent);

      // console.log(internalState);
      // handlers.forEach(h => { h(); });
    },
    subscribe: (handler) => {
      handlers.push(handler);
    },
    getState: () => dataBase
  };
};

//update
let container = createStore(update);

/* ====END REDUX STRUCTURE============================= */

const RemoveButton = props =>{
  const handleClick = () =>{
    console.log(`Delete ${props.idToRemove}`);
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


const useAdminState = () => {
  const [database, setDatabase] = useState(GetDatabase());
  const [tempNewScenario, setTempNewScenario] = useState({
    'id' : null,
    'scenario' : '',
    'category' : 0,
    'active' : false
  });
  useEffect(() => {

  }, []);

  const setNewScenario = (newScenario) => {
    setTempNewScenario({
      'id': newScenario.id ? newScenario.id : null,
      'scenario': newScenario.scenario,
      'category' : newScenario.category,
      'active' : false
    });
  }

  return {
    database, setNewScenario
  }
}

/* =============TEST============ */

export const AppAdmin = () => {
  const {
    database,
    setNewScenario
  } = useAdminState();
  const context = useContext(ConfigContext);

  let { url } = useRouteMatch();

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to={`${url}`}>Home</Link>
          </li>
          <li>
            <Link to={`${url}/add`}>Add</Link>
          </li>
          <li>
            <Link to={`${url}/edit`}>Edit</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path={`${url}`}>
            <Home
              rows={database}
             />
          </Route>
          <Route path={`${url}/add`}>
            <Add
              rows={database}
             />
          </Route>
          <Route path={`${url}/edit`}>
            <Edits
              rows={database}
              setNewScenario={setNewScenario}
             />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home(props) {
  return(
    <div>
      <h2>Home</h2>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Scenario</td>
            <td>Category</td>
            <td>Enabled</td>
            <td colSpan="2">Controls</td>
          </tr>
        </thead>
        <tbody>
        {props.rows.map(row =>
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.scenario}</td>
            <td>{row.category}</td>
            <td>{row.active ? 'ON' : 'OFF'}</td>
            <td>
              
            </td>
            <td>
              <RemoveButton
                idToRemove={row.id}
              />
            </td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
}

function Add() {
  return(
    <SubmitForm
      url={'add'} 
    />
  );
}

function Edits(props) {
 
  let { path, url } = useRouteMatch();

  return(
    <div>
      <h2>Edit</h2>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Scenario</td>
            <td>Category</td>
            <td>Enabled</td>
            <td colSpan="2">Controls</td>
          </tr>
        </thead>
        <tbody>
        {props.rows.map(row =>
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.scenario}</td>
            <td>{row.category}</td>
            <td>{row.active ? 'ON' : 'OFF'}</td>
            <td>
              <Link to={`${url}/${row.id}`}>Edit</Link>
            </td>
            <td>
              {/* <RemoveButton
                idToRemove={row.id}
              /> */}
            </td>
          </tr>
        )}
        </tbody>
      </table>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:scenarioId`}>
          <SubmitForm
            setNewScenario={props.setNewScenario}
            url={'edit'}
          />
        </Route>
      </Switch>

    </div>
  );
}

const SubmitForm = props =>{

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
          'category' : tempOption.value,
          'active' : scenarioEnabled
        }
    
        console.log(UpdatedScenario);
        //--send it to update
        // history.push("/AppAdmin/edit");
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









export default AppAdmin;