import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory, Route } from 'react-router';
import './index.css';

import App from './App';
import BeerJournal from './BeerJournal';

// material-design-lite
import 'material-design-lite/dist/material.brown-blue.min.css';
import 'material-design-lite/dist/material.min';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="beerJournal" component={BeerJournal}/>
  </Router>,
  document.getElementById('root')
);
