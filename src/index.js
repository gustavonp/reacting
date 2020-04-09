import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './index.css';

// Dependencies
import LocalStorageDatabase from './services/database';

// Components
import StartRating from './MainProgram';

/**
 * Main application
 */
class App extends React.Component {

  database;
  isDatabaseInitialized = false;

  constructor(props) {
    super(props);
    
    this.database = new LocalStorageDatabase();
    this.isDatabaseInitialized = this.database.initialize();   
  }

  render() {
    if (this.isDatabaseInitialized) {
      return (
        <Router>
          <div>
            <Switch>
              <Route path="/InfuriRate">
                <InfuriRate />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      );
    } else {
      return (
        <h1>
          We are experiencing a problem, and that's very irritating. Come back
          later!
        </h1>
      );
    }
  }
}

function Home() {
  return (
    <div className="App">
      <h1>Infuri<i>rating</i></h1>
      <p>Add some clever comment about the game here</p>
      <Link to="/InfuriRate">Begin</Link>
    </div>
  );
}

function InfuriRate() {
  return (
    <div className="App">
      <h1>
        Infuri<i>rating</i>
      </h1>
      <StartRating/>
    </div>
  );
}

/** 
 * Starting the game
 */
ReactDOM.render(<App />, document.getElementById('root'));
