import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

const { contains, listOf } = ImmutablePropTypes
const { number, string } = PropTypes;

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
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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

        <h3 className="ui header">Results</h3>
        You scored {this.percentCorrect()}%!

        <div className="ui horizontal divider"></div>

        {responses.map((response, idx) => <ResponseItem key={idx} {...response.toObject()} />)}
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
    choiceIndex: number.isRequired
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const { choices, correctIndex, choiceIndex } = this.props;
    const isCorrect = correctIndex === choiceIndex;
    return <div className={"ui message" + (isCorrect ? " positive" : " negative")}>
      <div className="header">
        {isCorrect ? "Correct" : "Incorrect"}
      </div>
      {JSON.stringify(choices)}
    </div>;
  }
}

export const ResultsContainer = connect(
  (state) => ({
    responses: state.getIn(['main', 'responses'])
  })
)(Results);
