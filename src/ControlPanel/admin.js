import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, useHistory, Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";

import { GetDatabase } from '../services/database';
import { ConfigContext } from '../App';

import { Home } from './pages/home';
import { Add } from './pages/add';
import { Edits } from './pages/edit';


/* ====END REDUX STRUCTURE============================= */


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
      'active' : newScenario.active
    });
  }

  const setDatabaseUpdate = () => {
    setDatabase(GetDatabase());
  }

  return {
    database, setNewScenario, setDatabaseUpdate
  }
}

export const AppAdmin = () => {
  const {
    database,
    setNewScenario,
    setDatabaseUpdate
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
              setDatabaseUpdate={setDatabaseUpdate}
             />
          </Route>
          <Route path={`${url}/add`}>
            <Add
              rows={database}
              setNewScenario={setNewScenario}
              setDatabaseUpdate={setDatabaseUpdate}
             />
          </Route>
          <Route path={`${url}/edit`}>
            <Edits
              rows={database}
              setNewScenario={setNewScenario}
              setDatabaseUpdate={setDatabaseUpdate}
             />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default AppAdmin;