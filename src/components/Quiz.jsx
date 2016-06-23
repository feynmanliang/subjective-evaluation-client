import R from 'ramda';

import React,{Component,PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import * as actionCreators from '../redux/action_creators';

import Boombox from './Boombox';

const boombox = require('boombox-js');

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
    next: func.isRequired
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    boombox.setup({
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

  getChoices() {
    if (this.props.question) {
      return this.props.question.get('choices').map((choice,index) =>
          <div key={choice.get('name')}>
            <button className={"ui button" + (this.isChosen() ? " active" : "")}
                    onClick={() => this.props.respond({ choiceIndex: index })}>
              <h1>{choice.get('name')}</h1>
            </button>
            <Boombox boombox={boombox}
                     name={choice.get('name')}
                     mp3Path={choice.get('url')} />
            <br />
          </div>
      );
    }
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
              onClick={this.props.next}>
        Next Question
      </button>
    </div>;
  }
};

export const QuizContainer = connect(
  (state) => ({
    question: state.getIn(['active', 'question']),
    response: state.getIn(['active', 'response'])
  }),
  actionCreators
)(Quiz);
