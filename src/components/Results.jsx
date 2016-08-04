import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import * as actionCreators from '../redux/action_creators';

const { contains, listOf } = ImmutablePropTypes
const { number, string, bool, func, object } = PropTypes;

export class Results extends Component {
  static propTypes = {
    responses: listOf(
      contains({
        choices: listOf(contains({
          name: string.isRequired,
          url: string.isRequired
        })).isRequired,
        correctIndex: number.isRequired,
        choiceIndex: number.isRequired
      })
    ).isRequired,
    submitted: bool.isRequired,
    submitResponses: func.isRequired
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    if (!this.props.submitted) this.props.submitResponses();
  }

  percentCorrect() {
    if (this.props.responses === undefined) return 0.0;
    else {
      const numCorrect = this.props.responses
        .filter(response => response.get('choiceIndex') == response.get('correctIndex'))
        .size;
      return (numCorrect / this.props.responses.size) * 100;
    }
  }

  render() {
    const { responses } = this.props;
    return <div className="ui vertical stripe segment">
      <div className="ui text container">

        <h1 className="ui header">Results</h1>

        <div className="ui divider"></div>

        <p>You scored {this.percentCorrect()}%! Refresh to try again.</p>

        <p>Thank you for taking time to contribute to creative AI research!
        Your participation generates valuable data which is used to evaluate
        and improve BachBot.</p>

      </div>
    </div>;
  }
}

class ResponseItem extends Component {
  static propTypes = {
    choices: listOf(contains({
      name: string.isRequired,
      url: string.isRequired
    })).isRequired,
    correctIndex: number.isRequired,
    choiceIndex: number.isRequired,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const { choices, correctIndex, choiceIndex } = this.props;
    const isCorrect = correctIndex === choiceIndex;
    const choice = this.props.choices.get(choiceIndex);
    return <div className={'ui message' + (isCorrect ? ' positive' : ' negative')}>
      <div className="header">
        {isCorrect ? 'Correct! This is a Bach original.' : 'Incorrect! This is computer generated.'}
      </div>
    </div>;
  }
}

export const ResultsContainer = connect(
  (state) => ({
    responses: state.getIn(['main', 'responses']),
    submitted: state.getIn(['main', 'submitted'])
  }),
  actionCreators
)(Results);
