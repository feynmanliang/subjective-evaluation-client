import 'babel-polyfill' // required for fetch

import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {Provider} from 'react-redux';

import configureStore from './redux/store';
import {setExperiment} from './redux/action_creators';

import MainLayout from './components/MainLayout';
import {QuizContainer} from './components/Quiz';
import Results from './components/Results';

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

const routes = <Route component={MainLayout}>
  <Route path="/" component={QuizContainer} />
  <Route path="/results" component={Results} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
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
//       <Router history={hashHistory}>{routes}</Router>,
//       document.getElementById('root'));
//   });

