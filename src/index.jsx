import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const active = {
  question: {
    experimentId: 2,
    choices: ['JCB1', 'sample0', 'sample1'],
    correctIndex: 0
  },
  response: undefined
};

ReactDOM.render(
  <App active={active} />,
  // TODO: choose prop should update responses in state
  document.getElementById('app')
);
