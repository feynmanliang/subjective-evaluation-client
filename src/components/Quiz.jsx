import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { PlayRestartPlayerContainer } from './PlayRestartPlayer';

import * as actionCreators from '../redux/action_creators';

const { contains, listOf } = ImmutablePropTypes;
const { string, number, func, object } = PropTypes;

export class Quiz extends Component {
  static propTypes = {
    question: contains({
      experimentId: string.isRequired,
      choices: listOf(contains({
        name: string.isRequired,
        url: string.isRequired
      })).isRequired,
      correctIndex: number.isRequired
    }).isRequired,
    response: contains({
      choiceIndex: number.isRequired
    }),
    questionNumber: number.isRequired,
    totalNumberQuestions: number.isRequired,
    loaded: listOf(string.isRequired),
    updateChoice: func.isRequired,
    next: func.isRequired,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    $(this.refs.progressBar).progress({
      value: this.props.questionNumber,
      total: this.props.totalNumberQuestions
    })
  }

  isChoiceSelected(index) {
    return this.props.response && (this.props.response.get('choiceIndex') === index);
  }

  getChoices() {
    return this.props.question.get('choices').map((choice,index) =>
        <tr key={choice.get('name')}
            className={this.isChoiceSelected(index) ? ' active' : ''}>
          <td className="collapsing">
            <div className="ui fitted">
              <button className="ui secondary button"
                      onClick={() => this.props.updateChoice({ choiceIndex: index })}>
                Select
              </button>
            </div>
          </td>
          <td>
            <PlayRestartPlayerContainer
              name={choice.get('name')}
              mp3Path={choice.get('url')}
              isLoaded={this.props.loaded.includes(choice.get('name'))} />
          </td>
        </tr>
    );
  }

  onClickNext() {
    $(this.refs.progressBar).progress('increment');
    this.props.next();
  }

  renderLoading() {
    return (
      <div className="ui active dimmer">
        <div className="ui text loader">Loading question...</div>
      </div>);
  }

  render() {
    const allLoaded = this.props.question.get('choices')
      .every((choice) => this.props.loaded.includes(choice.get('name')))
    const loader = !allLoaded ? this.renderLoading() : undefined
    // TODO: render loader

    return <div className="ui vertical stripe segment">
      <div className="ui text container">

        <h1 className="ui header">The BachBot Challenge</h1>
        <div className="ui divider"></div>

        <table className="ui compact celled unstackable table" style={{ margin: '2em 0em' }}>
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
                <button className="ui right floated small primary button"
                        onClick={::this.onClickNext}
                        disabled={!this.props.response}>
                  Submit
                </button>
              </th>
            </tr>
          </tfoot>
        </table>
        <div className="ui indicating progress" ref="progressBar">
          <div className="bar">
            <div className="progress"></div>
          </div>
          <div className="label">Question {this.props.questionNumber} out of {this.props.totalNumberQuestions}</div>
        </div>
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
    loaded: state.getIn(['main', 'active', 'loaded']),
  }),
  actionCreators
)(Quiz);

