import 'babel-polyfill' // required for fetch

import R from 'ramda';

import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducer from './redux/reducer';

import MainLayout from './components/MainLayout';
import Quiz from './components/Quiz';

export const store = createStore(reducer);

// load experiment samples to generate questions from
fetch('http://localhost:3000/')
  .then(response => response.json())
  .then(experimentData => {
    const experimentId = experimentData.id
    const original = experimentData.original
    const generated = experimentData.generated

    let questions = []
    for (let i = 0; i < 5; ++i) {
      // TODO: support 1 orig vs multile genereated
      // TODO: support multiple origs (requires multiple correctIndex)
      // TODO: make number of questions configurable in experiment.json
      // TODO: make num orig vs num gen configurable in experiment.json
      const origIdx = Math.floor(Math.random() * original.length);
      const genIdx = Math.floor(Math.random() * generated.length); // TODO: prevent duplicate questions

      let choices = [ original[origIdx], generated[genIdx] ];
      const correctIndex = Math.floor(Math.random() * choices.length);
      choices[0] = choices[correctIndex]
      choices[correctIndex] = original[origIdx]

      const question = {
        experimentId,
        choices,
        correctIndex
      }
      questions.push(question);
    }
    return questions;
  })
  // .then(questions => {
  //   store.dispatch({
  //     type: 'SET_QUESTIONS',
  //     questions
  //   });
  // })
  .then((questions) => {
    ReactDOM.render(
      <MainLayout>
        <Quiz active={{
          question: R.head(questions)
        }} questions={R.tail(questions)} />
      </MainLayout>,
      document.getElementById('root'));
  });

