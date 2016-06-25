import R from 'ramda';
import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import boombox from 'boombox-js';

import * as actionCreators from '../redux/action_creators';

import UserInfoForm from './UserInfoForm';
import { QuizContainer } from './Quiz';
import { ResultsContainer } from './Results';

const { bool, func } = PropTypes;

export class Challenge extends Component {
  static propTypes = {
    hasActiveQuestion: bool.isRequired,
    hasUserInfo: bool.isRequired,
    navigateTo: func.isRequired
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    this.boombox = boombox;
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
    if (!nextProps.hasActiveQuestion) {
      this.boombox.power(this.boombox.POWER_OFF);
    } else {
      this.boombox.power(this.boombox.POWER_ON);
    }
  }

  render() {
    if (!this.props.hasUserInfo) {
      return <UserInfoForm.form />;
    } else {
      if (this.props.hasActiveQuestion) {
        return <QuizContainer boombox={this.boombox} />;
      } else {
        return <ResultsContainer boombox={this.boombox} />;
      };
    }
  }
};

export const ChallengeContainer = connect(
  (state) => ({
    hasActiveQuestion: state.getIn(['main', 'active', 'question']) !== undefined,
    hasUserInfo: state.getIn(['main', 'userInfo']) !== undefined,
  }),
  actionCreators
)(Challenge);

