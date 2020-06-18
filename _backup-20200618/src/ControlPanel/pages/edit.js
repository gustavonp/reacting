import React from 'react';
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import SubmitForm from '../elements/SubmitForm';

export function Edits(props) {

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
            setDatabaseUpdate={props.setDatabaseUpdate}
            url={'edit'}
          />
        </Route>
      </Switch>

    </div>
  );
}

export default Edits;