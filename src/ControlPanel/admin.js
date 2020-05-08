import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";

import { GetDatabase } from '../services/database';
import { ConfigContext } from '../App';
import { FetchScenarioRow, FetchCategories } from "../utilities/utilities";


/*
TO DO==
- create route to /edit/[id]
  - check how to use onChange the Select option 
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
    'REMOVE' : '',
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
  const editPerId = () =>{
    container.dispatch('DELETE', props.idToRemove);
  }
  return(
    <>
      <button
        onClick={editPerId}
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
          <ContentForm
            setNewScenario={props.setNewScenario}
          />
        </Route>
      </Switch>

    </div>
  );
}

const ContentForm = props =>{
  let { scenarioId } = useParams();
  let scenario = FetchScenarioRow(scenarioId);
  let categories = FetchCategories();

  const [tempId, setTempId] = useState({value: scenario.id});
  const [tempInput, setTempInput] = useState({id: scenario.id, value: scenario.scenario});
  const [tempOption, setTempOption] = useState({value: scenario.category})

  if(scenario.id !== tempId.value){
    setTempId({value: scenario.id});
    setTempInput({value: scenario.scenario});
    setTempOption({value: scenario.category});
  }

  function handleChangeInput(event) {    
    return setTempInput({value: event.target.value});
  };
  
  function handleChangeSelect(event) {
    return setTempInput({category: event.target.value});
  };

  
  // console.log(scenario.category);
  
  

  if(props.length < 1){
    // console.log('add');
  }else{
    // console.log('edit');
  }

  return(
    <div>
      <br/>
      <form>
      <input type="text" value={tempInput.value} onChange={handleChangeInput} />

      <select value={tempOption.value} onChange={handleChangeSelect} >
        {categories.map(category =>
          <option 
            key={category.id}
            value={category.id}
          >{category.category}</option>
        )}
      </select>
      <button> Add + </button>
      </form>
    </div>
  );
};













export default AppAdmin;