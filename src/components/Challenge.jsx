import R from 'ramda';

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import * as actionCreators from '../redux/action_creators';

import { QuizContainer } from './Quiz';
import { ResultsContainer } from './Results';

const { bool } = PropTypes;

export class Challenge extends Component {
  static propTypes = {
    hasActiveQuestion: bool.isRequired
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

  componentWillUpdate(nextProps) {
    if (!this.props.hasActiveQuestion) {
      this.boombox.power(this.boombox.POWER_OFF);
    }
  }

  render() {
    if (this.props.hasActiveQuestion) {
      return <QuizContainer boombox={this.boombox} />;
    } else {
      return <ResultsContainer />;
    };
  }
};

export const ChallengeContainer = connect(
  (state) => ({
    hasActiveQuestion: state.getIn(['main', 'active', 'question']) !== undefined,
  }),
  actionCreators
)(Challenge);

