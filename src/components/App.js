import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './Shared/Header';
import HomePage from './home/HomePage';
import ControlPanel from './ControlPanel';
import AboutPage from './about/AboutPage';
import PageNotFound from './PageNotFound';
import ScenariosPage from './scenarios/ScenariosPage';
import CategoriesPage from './categories/CategoriesPage';

function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/controlpanel" component={ControlPanel} />

        <Route exact path="/scenarios" component={ScenariosPage} />
        <Route exact path="/categories" component={CategoriesPage} />
        <Route path="/about" component={AboutPage} />
        <Route component={PageNotFound} />
      </Switch>
    </React.Fragment>
  )
}

export default App;