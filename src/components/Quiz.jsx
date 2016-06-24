import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import * as actionCreators from '../redux/action_creators';

import { BoomboxContainer } from './Boombox';

const { contains, listOf } = ImmutablePropTypes;
const { string, number, func, object } = PropTypes;

export class Quiz extends Component {
  static propTypes = {
    boombox: object.isRequired,
    question: contains({
      experimentId: string.isRequired,
      choices: listOf(contains({
        name: string.isRequired,
        url: string.isRequired
      })).isRequired,
      correctIndex: number.isRequired
    }),
    response: contains({
      choiceIndex: number.isRequired
    }),
    questionNumber: number.isRequired,
    totalNumberQuestions: number.isRequired,
    updateChoice: func.isRequired,
    next: func.isRequired,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  isChoiceSelected(index) {
    return this.props.response && (this.props.response.get("choiceIndex") === index);
  }

  getChoices() {
    if (this.props.question) {
      return this.props.question.get('choices').map((choice,index) =>
          <tr key={choice.get('name')}
              className={this.isChoiceSelected(index) ? " active" : ""}>
            <td className="collapsing">
              <div className="ui fitted">
                <button className="ui secondary button"
                        onClick={() => this.props.updateChoice({ choiceIndex: index })}>
                  Select
                </button>
              </div>
            </td>
            <td>
              <BoomboxContainer boombox={this.props.boombox}
                name={choice.get('name')}
                mp3Path={choice.get('url')} />
            </td>
          </tr>
      );
    }
  }

  onClickNext() {
    this.props.boombox.pause();
    this.props.next();
  }

  render() {
    return <div className="ui vertical stripe segment">
      <div className="ui text container">

        <h3 className="ui header">The BachBot Challenge</h3>

        <div className="ui divider"></div>

        <table className="ui compact celled unstackable table" style={{ margin: "2em 0em" }}>
          <thead>
            <tr>
              <th></th>
              <th>
                Select the music most similar to Bach
              </th>
            </tr>
          </thead>
          <tbody>
            {this.getChoices()}
          </tbody>
          <tfoot className="full-width">
            <tr>
              <th></th>
              <th>
                Question {this.props.questionNumber} out of {this.props.totalNumberQuestions}
                <button className="ui right floated small primary button"
                        onClick={::this.onClickNext}
                        disabled={!this.props.response}>
                  Submit
                </button>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>;
  }
}

export const QuizContainer = connect(
  (state) => ({
    question: state.getIn(['main', 'active', 'question']),
    response: state.getIn(['main', 'active', 'response']),
    questionNumber: state.getIn(['main', 'responses']).size + 1,
    totalNumberQuestions: state.getIn(['main', 'questions']).size + state.getIn(['main', 'responses']).size + 1,
  }),
  actionCreators
)(Quiz);

