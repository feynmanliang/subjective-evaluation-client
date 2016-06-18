import {expect} from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType
} from 'react-addons-test-utils';

import Results from '../../src/components/Results';

describe('Results', () => {
  it('correctly computes percentCorrect', () => {
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

    const results = renderIntoDocument(
      <Results responses={responses} />
    );
    expect(results.percentCorrect()).to.equal(0.5);
    expect(ReactDOM.findDOMNode(results).textContent).to.contain('0.5');
  });
});
