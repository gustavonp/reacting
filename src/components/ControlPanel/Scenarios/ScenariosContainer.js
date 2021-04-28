import React, { useState, useEffect } from 'react';
import Scenarios from './Scenarios';

import { useSelector, useDispatch } from "react-redux";
import * as scenarioActions from '../../../redux/actions/scenarioActions';

const ScenariosContainer = () => {
  const scenarios = useSelector(state => state.scenarios);
  const dispatch = useDispatch();

  const [scenarioList, setScenarioList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (scenarios.length !== 0) {
      setScenarioList(scenarios);
    } else {
      dispatch(scenarioActions.loadScenarios())
      .catch(error =>{
        setErrors({onSave: error.message});
      })
    }
  }, [scenarios]);

  return (<Scenarios scenarios={scenarios} />);

}

export default ScenariosContainer;
