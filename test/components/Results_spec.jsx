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

    const resultsComponent = renderIntoDocument(
      <Results responses={responses} />
    );
    expect(resultsComponent.percentCorrect()).to.equal(0.5);
    // TODO: test results.textContent to be correct
  });
});
