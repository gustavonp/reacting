import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

// Dependencies
import LocalStorageDatabase from './services/database';

/*
- Create one simple login to test
  - if correct, load Database.
*/

/* ==START REDUX STRUCTURE============================= */

const update = (model, action) =>{
  const updates = {
    'CREATE' : '',
    'REMOVE' : '',
    'UPDATE' : '',
    'DELETE' : ''
  };

  return (updates[action.type] || (() => model)) (model);
};

let model = {
  '' : ''
};

function mapStateToProps(state){
  return state;
};
function mapDispatchToProps(dispatch){
  return{
    onCreate: () => {dispatch({type: 'CREATE'});},
    onRemove: () => {dispatch({type: 'REMOVE'});},
    onUpdate: () => {dispatch({type: 'UPDATE'});},
    onDelete: () => {dispatch({type: 'DELETE'});}
  };
}

let View = connect(mapStateToProps, mapDispatchToProps)((props) =>{
  return (
    <div>
      hi
    </div>);
});

/**
 * Default call for Redux
 */
let container = createStore(update);

/**
 * List of actions that the administrator can perform
 */
let intents = {
  CREATE: 'CREATE',
  REMOVE: 'REMOVE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
};

/* ====END REDUX STRUCTURE============================= */


/* ==START ROUTING STRUCTURE=========================== */
export default class AppAdmin extends React.Component {

  database;
  isDatabaseInitialized = false;

  constructor(props){
    super(props);

    this.database = new LocalStorageDatabase();
    this.isDatabaseInitialized = this.database.initialize();
  }

  render(){
    if(this.isDatabaseInitialized){
      return (
        <Router>
          <div>
            <Switch>
              <Router path="/AppAdmin/">
                <Login />
              </Router>
              <Router path="/AppAdmin/admin/">
                <ControlPanel />
              </Router>
            </Switch>
          </div>
        </Router>
      );
    } else {
      return (
        <h1>We are experiencing a problem, and that's very irritating. Come back
          later!</h1>
      );
    }
  }
};

// const Login = () => {
//   return(
//     <div>please, log me<br/>
//       <Link to="/AppAdmin/admin">Login</Link>
//     </div>
//   );
// };

function Login() {
  return(
    <div>please, log me<br/>
      <Link to="/admin">Login</Link>
    </div>
  );
};

function ControlPanel() {
  return(<div> You are in </div>);
}

// const ControlPanel = () => {
//   return(<div> You are in </div>);
// };
/* ====END ROUTING STRUCTURE=========================== */


/** 
 * Starting the game
 */
ReactDOM.render(
    <AppAdmin />, document.getElementById('root')
);
