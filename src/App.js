import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";
import Home from './pages/Home';
import Rating from './pages/Rating';
import AppAdmin from './ControlPanel/admin.js';
import { IsDatabaseInitialized } from './services/database';

export const ConfigContext = React.createContext();

const configValue = {
  isDebugActivate: true,
  IsDatabaseInitialized: IsDatabaseInitialized() ? true : false,
  isEnough: 5
};

export default function App(){

  // const heyHere = IsDatabaseInitialized;

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Rating">Rating</Link>
            </li>
            <li>
              <Link to="/AppAdmin">AppAdmin</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/AppAdmin/">
            <AppAdminLink />
          </Route>
          
          <Route path="/Rating">
            <RatingLink />
          </Route>
          <Route path="/">
            <HomeLink />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function HomeLink(){
  return (
    <ConfigContext.Provider value={configValue}>
      <Home />
    </ConfigContext.Provider>
  );
}

function RatingLink(){
  return (
    <ConfigContext.Provider value={configValue}>
      <Rating />
    </ConfigContext.Provider>
  );
}

function AppAdminLink(){

  return (
    <ConfigContext.Provider value={configValue}>
      <AppAdmin 
        hello={'world'}
      />
    </ConfigContext.Provider>
  );
}