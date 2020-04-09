import React from 'react';
import ReactDOM from 'react-dom';
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
        <div className="App">
          <h1>
            Infuri<i>rating</i>
          </h1>
          <StartRating/>
        </div>
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

/** 
 * Starting the game
 */
ReactDOM.render(<App />, document.getElementById('root'));
