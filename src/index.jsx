import 'babel-polyfill' // required for fetch

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './redux/store';
import { setExperiment } from './redux/action_creators';

import MainLayout from './components/MainLayout';
import { QuizContainer } from './components/Quiz';
import { ResultsContainer } from './components/Results';

fetch('http://localhost:3000/experiment.json')
  .then(response => response.json())
  .then(experimentData => {
    const store = configureStore();
    store.dispatch(setExperiment(experimentData));
    return store;
  })
  .then((store) => {
    const history = syncHistoryWithStore(browserHistory, store, {
        selectLocationState (state) {
            return state.get('routing').toJS();
        }
    });

    ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={MainLayout}>
            <IndexRoute component={QuizContainer} />
            <Route path="results" component={ResultsContainer} />
          </Route>
        </Router>
      </Provider>,
      document.getElementById('root'));
  });

