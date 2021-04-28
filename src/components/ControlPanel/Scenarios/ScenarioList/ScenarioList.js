import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ScenarioList = (props) => {
  const { scenarios } = props;

  return(
    <Container>
      <div>
        {scenarios.map(scenario => (
          <div key={scenario.description}>
            <Link to={`/controlpanel/scenario/${scenario.id}`}>{scenario.description}</Link>
          </div>
        ))}
      </div>
    </Container>
  );
}

ScenarioList.propTypes = {
	scenarios: PropTypes.array.isRequired
};


export default ScenarioList;