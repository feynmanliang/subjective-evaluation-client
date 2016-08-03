import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Audio from 'react-howler';
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
    if (::this.isPlaying()) {
      this.audio.seek(1e-12)
    }
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
          src={this.props.mp3Path}
          playing={::this.isPlaying()}
          onLoad={() => this.props.onLoaded(this.props.name)}
          onLoadError={() => alert('Sorry, there was an error loading the sample: ' + this.props.name)}
          ref={(ref) => this.audio = ref} />
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

