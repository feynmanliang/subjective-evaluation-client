import 'babel-polyfill' // required for fetch

import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducer from './redux/reducer';

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
            "url": "http://www.midiworld.com/classic.htm/beethoven.htm"
        },
        {
            "name": "Bach",
            "url": "http://www.midiworld.com/midis/other/c1/J_C_Bach_Ach_dass_ich_Wassers_gnug_hatte.mid"
        }
    ],
    "generated": [
        {
            "name": "Hindemith",
            "url": "http://www.midiworld.com/midis/other/c1/hindbsn1.mid"
        },
        {
            "name": "Poulenc",
            "url": "http://www.midiworld.com/midis/other/poulenc/poulcmo1.mid"
        }
    ]
};

const store = createStore(reducer);
store.dispatch({
  type: 'SET_EXPERIMENT',
  experimentData
});

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

