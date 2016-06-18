import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import QuestionResponse from '../../src/components/QuestionResponse';
import {expect} from 'chai';

describe('QuestionResponse', () => {
  it('renders the possible choices', () => {
    const active = {
      question: {
        experimentId: 2,
        choices: ['JCB1', 'sample0', 'sample1'],
        correctIndex: 0
      },
      response: undefined
    };
    const component = renderIntoDocument(
      <QuestionResponse {...active} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(3);
    expect(buttons[0].textContent).to.equal('JCB1');
    expect(buttons[1].textContent).to.equal('sample0');
    expect(buttons[2].textContent).to.equal('sample1');
  });

  it('invokes click prop callback when a button is clicked', () => {
    let choiceIndex;
    const choose = (index) => choiceIndex = index;

    const active = {
      question: {
        experimentId: 2,
        choices: ['JCB1', 'sample0', 'sample1'],
        correctIndex: 0
      },
      response: undefined
    };
    const component = renderIntoDocument(
      <QuestionResponse {...active} choose={choose} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(choiceIndex).to.equal(0);
    // TODO: test that choice is correct/incorrect
  });
});
