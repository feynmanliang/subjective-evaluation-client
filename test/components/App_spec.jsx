import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';
import App from '../../src/components/App';
import {expect} from 'chai';

describe('App', () => {

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
      <App {...active} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(3);
    expect(buttons[0].textContent).to.equal('JCB1');
    expect(buttons[1].textContent).to.equal('sample0');
    expect(buttons[2].textContent).to.equal('sample1');
  });

});
