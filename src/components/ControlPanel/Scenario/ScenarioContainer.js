import React, { useState, useEffect } from 'react';
import ScenariosForm from './ScenariosForm';
import { Redirect, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import * as scenarioActions from '../../../redux/actions/scenarioActions';

const ScenarioContainer = () => {
  const { scenarioId } = useParams();
  if(!scenarioId) return <Redirect to="/controlpanel" />

  const scenario = useSelector(state => state.scenarios);
  const dispatch = useDispatch();

  const [categoryList, setCategoryList] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (scenario.length == 0) {
      dispatch(scenarioActions.loadScenario(scenarioId))
      .catch(error =>{
        setErrors({onSave: error.message});
      })
    }
  }, [scenario]);

  if(scenario) {
    return(
      <ScenariosForm scenario={scenario} />
    );
  }else{
    return(<div>Loading...</div>);
  }

}

export default ScenarioContainer;