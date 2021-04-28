import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Route, Switch, useParams } from 'react-router-dom';

import ScenarioList from './ScenarioList';

const Scenarios = (props) => {
  const { scenarios } = props;
  const { scenarioId } = useParams() || {};

  return (
    <ScenarioList scenarios={scenarios} />
  )
}

Scenarios.propTypes = {
	scenarios: PropTypes.array
};

export default Scenarios;
