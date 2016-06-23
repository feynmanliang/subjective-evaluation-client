import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

const { contains, listOf } = ImmutablePropTypes
const { number } = PropTypes;

export class Results extends Component {
  static propTypes = {
    responses: listOf(
      contains({
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
    return <div className="results">
      You scored {this.percentCorrect()}%!
    </div>
  }
}

export const ResultsContainer = connect(
  (state) => ({
    responses: state.getIn(['main', 'responses'])
  })
)(Results);
