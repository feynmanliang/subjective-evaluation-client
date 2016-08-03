import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Audio from 'react-player';
import { connect } from 'react-redux';

import * as actionCreators from '../redux/action_creators';

const { listOf } = ImmutablePropTypes;
const { object, string, bool, func } = PropTypes;

export class PlayRestartPlayer extends Component {
  static propTypes = {
    name: string.isRequired,
    mp3Path: string.isRequired,
    // injected by connect()
    nowPlaying: string,
    onLoaded: func.isRequired,
    playResumeSound: func.isRequired,
    pauseSound: func.isRequired,
    replaySound: func.isRequired,
  };

  isPlaying() {
    return this.props.nowPlaying === this.props.name;
  }

  onPlayClick() {
    this.props.playResumeSound(this.props.name);
  }

  onPauseClick() {
    this.props.pauseSound(this.props.name);
  }

  onReplayClick() {
    this.audio.seekTo(0);
    this.props.replaySound(this.props.name);
  }

  renderPlayPauseButton() {
    if (::this.isPlaying()) {
      return <button className="ui button" onClick={::this.onPauseClick}>
        <i className="pause icon"></i>
      </button>;
    } else {
      return <button className="ui button" onClick={::this.onPlayClick}>
        <i ref="play" className="play icon"></i>
      </button>;
    }
  }

  renderControls() {
    return (
      <div className="ui icon buttons">
        {::this.renderPlayPauseButton()}
        <button className="ui button" onClick={::this.onReplayClick}>
          <i ref="replay" className="fast backward icon"></i>
        </button>
      </div>);
  }

  renderNowPlayingIcon() {
    return (
      <span className="right">
        {(() => {
          if (::this.isPlaying()) {
            return <i className="volume up icon" style={{
              verticalAlign: 'top',
              fontSize: '1.5em'
            }}></i>
          }
        })()}
      </span>);
  }

  render() {
    return (
      <div>
        <Audio
          url={this.props.mp3Path}
          playing={::this.isPlaying()}
          onError={(err) => alert('Sorry, your browser couldn\'t load the audio file: ' + this.props.name)}
          width="0"
          height="0"
          ref={(ref) => this.audio = ref}
        />
        {::this.renderControls()}
        {::this.renderNowPlayingIcon()}
    </div>);
  }
}

export const PlayRestartPlayerContainer = connect(
  (state) => ({
    nowPlaying: state.getIn(['main', 'active', 'nowPlaying']),
  }),
  actionCreators
)(PlayRestartPlayer)

