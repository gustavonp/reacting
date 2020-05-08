import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";



import { GetDatabase } from '../services/database';
import { ConfigContext } from '../App';

/*
TO DO==
- create route to /edit/[id]



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

const EditButton = props =>{
  const editPerId = () =>{
    container.dispatch('UPDATE', props.idToEdit);
  }
  return(
    <>
      <Link to={`/AppAdmin/edit/${props.idToEdit}`}>EEdit</Link>
      <button
        onClick={editPerId}
      >
      Edit
      </button>
    </>
  );
}

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

const ViewContent = props => {
  return(
    <div>
      <table>
        <tbody>
        {props.rows.map(row =>
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.scenario}</td>
            <td>{row.category}</td>
            <td>{row.active ? 'ON' : 'OFF'}</td>
            <td>
              <EditButton
                idToEdit={row.id}
              />
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
};

const ContentForm = props =>{



  // console.log(container);



  if(props.length < 1){
    // console.log('add');
  }else{
    // console.log('edit');
  }


  return(
    <div>
      <br/>
      <form>
      <input value='John' />
      <select id="cars" name="carlist" form="carform">
        <option value="0">Smell</option>
        <option value="1">Taste</option>
        <option value="2">Vision</option>
        <option value="3">Hearing</option>
        <option value="4">Tact</option>
        <option value="5">Mental</option>
      </select>
      <button> Add + </button>
      </form>
    </div>
  );
};


const useAdminState = () => {
  const [database, setDatabase] = useState(GetDatabase());
  useEffect(() => {

  }, []);

  return {
    database
  }
}

export const AppAdmin = props =>{
  const {
    database
  } = useAdminState();

  // console.log(props);

  const context = useContext(ConfigContext);

  let crate = container.getState()

  // console.log(crate);

  return(
    <div>
      <ViewContent
        rows={container.getState()}
       />
      <ContentForm />
    </div>
  );
};

export default AppAdmin;