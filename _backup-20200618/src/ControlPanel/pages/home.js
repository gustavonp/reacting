import React from 'react';

import { RemoveButton } from '../elements/RemoveButton';

export function Home(props) {
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
                setDatabaseUpdate={props.setDatabaseUpdate}
              />
            </td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
}

export default Home;