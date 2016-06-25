import 'babel-polyfill' // required for fetch

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './redux/store';
import { setExperiment } from './redux/action_creators';

import MainLayout from './components/MainLayout';
import About from './components/About';
import { ChallengeContainer } from './components/Challenge';

//fetch("experiment.json")
fetch("https://bachbot.blob.core.windows.net/experiments/experiment.json") // TODO: ship with server and read from CDN
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
            <IndexRoute component={About} />
            <Route path="quiz" component={ChallengeContainer} />
          </Route>
        </Router>
      </Provider>,
      document.getElementById('root'));
  });

