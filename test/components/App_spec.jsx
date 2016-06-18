import {expect} from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';

import App from '../../src/components/App';
import QuestionResponse from '../../src/components/QuestionResponse';
import Results from '../../src/components/Results';

describe('App', () => {
  it('renders QuestionResponse when an active question exists', () => {
    const active = {
      question: {
        experimentId: 2,
        choices: ['JCB1', 'sample0', 'sample1'],
        correctIndex: 0
      },
      response: undefined
    };

    const component = renderIntoDocument(
      <App active={active} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons).to.have.lengthOf(3);

    const results = ReactDOM.findDOMNode(component.refs.results);
    expect(results).to.be.not.ok;
  });

  it('renders Results when finished', () => {
    const responses = [
      {
        experimentId: 2,
        choices: ['JCB1', 'sample0', 'sample1'],
        correctIndex: 0,
        choiceIndex: 1
      },
      {
        experimentId: 2,
        choices: ['JCB2', 'sample2', 'sample3'],
        correctIndex: 2,
        choiceIndex: 2
      },
    ];

    const component = renderIntoDocument(
      <App active={undefined} responses={responses} question={[]}/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons).to.be.empty;

    const results = ReactDOM.findDOMNode(component.refs.results);
    expect(results).to.be.ok;
  });
});
