import R from 'ramda';

import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import * as actionCreators from '../redux/action_creators';

import Boombox from './Boombox';


const {contains, listOf} = ImmutablePropTypes
const {string, number, func} = PropTypes;

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
    respond: func.isRequired,
    next: func.isRequired,
    navigateTo: func.isRequired
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    this.boombox = require('boombox-js');
    this.boombox.setup({
      webaudio: {
        //use: false // force override
      },
      htmlaudio: {
        //use: true // force override
      },
      htmlvideo: {
        //use: true // force override
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    // TODO: use named path
    // TODO: move app logic in reducer
    if (nextProps.question === undefined) this.props.navigateTo('/results');
  }

  getChoices() {
    if (this.props.question) {
      return this.props.question.get('choices').map((choice,index) =>
          <div key={choice.get('name')}>
            <button className={"ui button" + (this.isChosen() ? " active" : "")}
                    onClick={() => this.props.respond({ choiceIndex: index })}>
              <h1>{choice.get('name')}</h1>
            </button>
            <Boombox boombox={this.boombox}
                     name={choice.get('name')}
                     mp3Path={choice.get('url')} />
            <br />
          </div>
      );
    }
  }

  onClickNext() {
    this.boombox.pause();
    this.props.next();
  }

  isChosen(index) {
    return this.props.response && this.props.response.choiceIndex === index;
  }

  render() {
    return <div className="quiz">
      <div className="choices">
        {this.getChoices()}
      </div>
      <button className={"ui button"}
              onClick={::this.onClickNext}>
        Next Question
      </button>
    </div>;
  }
};

export const QuizContainer = connect(
  (state) => ({
    question: state.getIn(['main', 'active', 'question']),
    response: state.getIn(['main', 'active', 'response'])
  }),
  actionCreators
)(Quiz);
