import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Header from './common/Header';

import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import PageNotFound from './PageNotFound';
import ScenariosPage from './scenarios/ScenariosPage';
import CategoriesPage from './categories/CategoriesPage';

function App(){
  return(
    <div className="container-fluid">
      <Header/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/scenarios" component={ScenariosPage} />
        <Route exact path="/categories" component={CategoriesPage} />
        <Route path="/about" component={AboutPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  )
}

export default App;