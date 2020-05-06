import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom';

import { GetDatabase } from '../services/database';
import { ConfigContext } from '../App';

/*
TO DO==
- bring the view to the AppAdmin Class
- check if the rest of the container still can be called
*/

const update = (model, action) =>{
  const updates = {
    'CREATE' : '',
    'REMOVE' : '',
    'UPDATE' : '',
    'DELETE' : ''
  };
  return (updates[action.type] || (() => model)) (model);
};

const RenderRow = props =>{

  // console.log(props);

  return(
    <tr key={props.mod.id}>
      <td>{props.mod.id}</td>
      <td>{props.mod.scenario}</td>
      <td>{props.mod.category}</td>
      <td>
        <button onClick={props.onClick(this)}>Update {props.mod.id}</button>
      </td>  
    </tr>
  );
}

let view = (m, clickFunc) =>{

  // let handler = (event) => {
  //   console.log(event);
  //   container.dispatch('UPDATE');
  // };


  return (
    <div>
      <table>
        <tbody>
        {m.map(mod =>
          <RenderRow 
            mod={mod}
            onClick={clickFunc}
          />
        )}
        </tbody>
      </table>
    </div>
    );
};


const createStore = (reducer) => {  //hooks
  let dataBase = GetDatabase();
  let internalState;
  let handlers = [];
  return {
    dispatch: (intent) => {
      console.log(intent);
      // internalState = reducer(internalState, intent);
      // handlers.forEach(h => { h(); });
    },
    subscribe: (handler) => {
      handlers.push(handler);
    },
    getState: () => dataBase
  };
};


/* ====END REDUX STRUCTURE============================= */

const useAdminState = () => {
  const [database, setDatabase] = useState(GetDatabase());
  useEffect(() => {

  }, []);

  return {
    database
  }
}

//update
let container = createStore(update);

export const AppAdmin = () =>{
  const {
    database
  } = useAdminState();

  const context = useContext(ConfigContext);

  const handler = props =>{
    console.log(props);
    container.dispatch('UPDATE');
  };

  const viewContent = view(container.getState(), handler);

  return(
    <div>
      {viewContent}
    </div>
  );
};

export default AppAdmin;