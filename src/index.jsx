import 'whatwg-fetch';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './redux/store';
import { setExperiment } from './redux/action_creators';
import ReactGA from 'react-ga'

import '../semantic/dist/semantic.css';
import '../semantic/dist/components/form';
import '../semantic/dist/components/progress';
import '../semantic/dist/components/sidebar';
import '../semantic/dist/components/tab';
import '../semantic/dist/components/transition';
import '../semantic/dist/components/visibility';
import './css/site.css';
import './css/about.css';

import MainLayout from './components/MainLayout';
import About from './components/About';
import { ChallengeContainer } from './components/Challenge';
import UserInfoForm from './components/UserInfoForm';

const gaTracker = (process.env.NODE_ENV === 'production') ? 'UA-26556828-2' : 'UA-00000000-1';
ReactGA.initialize(gaTracker, {
  debug: (process.env.NODE_ENV === 'development')
});
function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

// const experimentJsonUrl = (process.env.NODE_ENV !== 'production') ?
//   'experiment.json' :
//   'https://bachbot-blob.azureedge.net/experiments/experiment.json'
const experimentJsonUrl = '/experiment.json';

fetch(experimentJsonUrl)
  .then(response => response.json())
  .then(experimentData => {
    const store = configureStore();
    store.dispatch(setExperiment(experimentData));
    return store;
  })
  .then((store) => {
    const history = syncHistoryWithStore(
      hashHistory,
      store,
      {
        selectLocationState (state) { // for react-redux-router <> immutable
          return state.get('routing').toJS();
        }
      });

    ReactDOM.render(
      <Provider store={store}>
        <Router history={history} onUpdate={logPageView}>
          <Route path="/" component={MainLayout}>
            <IndexRoute component={About} />
            <Route path="quiz" component={ChallengeContainer} />
          </Route>
        </Router>
      </Provider>,
      document.getElementById('root'));
  });
