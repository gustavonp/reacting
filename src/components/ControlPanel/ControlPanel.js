import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Wrapper } from './styles';

import Scenarios from './Scenarios';
import Home from './Home';

const ControlPanel = () => {
  
  return (
    <Wrapper>
      <Switch>
        <Route exact path="/controlpanel/" component={Home} />
        <Route exact path="/controlpanel/scenarios" component={Scenarios} />
        {/*
        <Route exact path="/controlpanel/categories" component={} />
        <Route exact path="/controlpanel/votes" component={} />
        <Route exact path="/controlpanel/ranking" component={} />
        <Route exact path="/controlpanel/logs" component={} />
      */}

      </Switch>
    </Wrapper>
  );
}

export default ControlPanel;
