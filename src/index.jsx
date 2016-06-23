import 'babel-polyfill' // required for fetch

import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducer from './redux/reducer';

import MainLayout from './components/MainLayout';
import Quiz from './components/Quiz';
import Results from './components/Results';

const store = createStore(reducer);

const routes = <Route component={MainLayout}>
  <Route path="/" component={Quiz} />
  <Route path="/results" component={Results} />
</Route>;

// load experiment samples to generate questions from
fetch('http://localhost:3000/')
  .then(response => response.json())
  .then()
  // .then(questions => {
  //   store.dispatch({
  //     type: 'SET_QUESTIONS',
  //     questions
  //   });
  // })
  .then((questions) => {
    ReactDOM.render(
      <Router history={hashHistory}>{routes}</Router>,
      document.getElementById('root'));
  });

