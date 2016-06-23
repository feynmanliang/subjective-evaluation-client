import R from 'ramda';

import React,{Component,PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import Boombox from './Boombox'; // TODO: initialize once

const {contains, list} = ImmutablePropTypes
const {string, number} = PropTypes;

export class Quiz extends Component {
  static propTypes = {
    question: contains({
      experimentId: string.isRequired,
      choices: list.isRequired,
      correctIndex: number.isRequired
    }).isRequired,
    response: contains({
      choiceIndex: number.isRequired
    })
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  getChoices() {
    if (this.props.question) {
      console.log(this.props.question);
      return this.props.question.get('choices').map((choice,index) =>
          <div key={choice.get('name')}>
            <button className={"ui button" + (this.isChosen() ? " active" : "")}
                    onClick={() => this.props.choose(choice.get('url'))}>
              <h1>{choice.get('name')}</h1>
            </button>
            <Boombox />
            <br />
          </div>
      );
    }
  }

  isChosen(index) {
    return this.props.response && this.props.response.choiceIndex === index;
  }

  render() {
    return <div className="choices">
      {this.getChoices()}
    </div>;
  }
};

export const QuizContainer = connect(
  (state) => ({
    question: state.getIn(['active', 'question']),
    response: state.getIn(['active', 'response'])
  })
)(Quiz);
