import 'babel-polyfill' // required for fetch

import R from 'ramda';

import React from 'react';
import ReactDOM from 'react-dom';

import makeStore from './redux/store';

import MainLayout from './components/MainLayout';
import Quiz from './components/Quiz';

export const store = makeStore();

// TODO: remove (shold be set by redux)
const active = {
  question: {
    experimentId: "abc",
    choices: [
      { name: 'JCB1', url: 'google.com' },
      { name: 'sample0', url: 'facebook.com' },
      { name: 'sample1', url: 'microsoft.com' }
    ],
    correctIndex: 0
  },
  response: undefined
};


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
      const origIdx = Math.round(Math.random() * original.length);
      const genIdx = Math.round(Math.random() * generated.length); // TODO: prevent duplicate questions

      let choices = [ original[origIdx], generated[genIdx] ];
      const correctIndex = Math.round(Math.random() * choices.length);
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
  }).then(questions => {
    // TODO: "choose" callback function prop should be used
    ReactDOM.render(
      <MainLayout>
        <Quiz active={{
          question: R.head(questions)
        }} questions={R.tail(questions)} />
      </MainLayout>,
      document.getElementById('root')
    );
  })

