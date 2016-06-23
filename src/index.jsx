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

// experimental config fetched from remote server
// TODO: make this an async request
const experimentData = {
    "id": "testExperiment",
    "original": [
        {
            "name": "Beethoven",
            "url": "/beethoven.mp3"
        },
        {
            "name": "Chopin",
            "url": "/chopin.mp3"
        }
    ],
    "generated": [
        {
            "name": "Joplin",
            "url": "/joplin.mp3"
        },
        {
            "name": "Largo",
            "url": "/largo.mp3"
        }
    ]
};

const store = configureStore();
store.dispatch(setExperiment(experimentData));

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

// load experiment samples to generate questions from
// fetch('http://localhost:3000/')
//   .then(response => response.json())
//   .then(questions => {
//     store.dispatch({
//       type: 'SET_QUESTIONS',
//       questions
//     });
//   })
//   .then((questions) => {
//     ReactDOM.render(
//       <Router history={browserHistory}>{routes}</Router>,
//       document.getElementById('root'));
//   });

