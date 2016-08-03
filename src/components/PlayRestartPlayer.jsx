import React, { Component, PropTypes } from 'react';
import Audio from 'react-howler';
import { connect } from 'react-redux';

import * as actionCreators from '../redux/action_creators';

const { object, string, func } = PropTypes;

export class PlayRestartPlayer extends Component {
  static propTypes = {
    name: string.isRequired,
    mp3Path: string.isRequired,
    // injected by connect()
    nowPlaying: string,
    playResumeSound: func.isRequired,
    pauseSound: func.isRequired,
    replaySound: func.isRequired,
  };

  componentWillMount() {
    const options = {
      src: [
        {
          media: 'audio/mp3',
          path: this.props.mp3Path
        }
      ]
    };
  }

  stopOtherSounds() {
    Object.keys(this.props.boombox.pool)
      .filter(k => k !== this.props.name)
      .map(name => this.props.boombox.get(name).stop());
  }

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

  playPauseButton() {
    if (this.isPlaying()) {
      return <button className="ui button" onClick={::this.onPauseClick}>
        <i className="pause icon"></i>
      </button>;
    } else {
      return <button className="ui button" onClick={::this.onPlayClick}>
        <i ref="play" className="play icon"></i>
      </button>;
    }
  }

  render() {
    return (
      <div>
        <div className="ui icon buttons">
          <Audio
            src={this.props.mp3Path}
            playing={this.isPlaying()}
            ref={(ref) => this.audio = ref} />
          {::this.playPauseButton()}
          <button className="ui button" onClick={::this.onReplayClick}>
            <i ref="replay" className="fast backward icon"></i>
          </button>
        </div>
        <span className="right">
          {(() => {
            if (this.isPlaying()) {
              return <i className="volume up icon" style={{
                verticalAlign: 'top',
                fontSize: '1.5em'
              }}></i>
            }
          })()}
        </span>
      </div>);
  }
}

export const PlayRestartPlayerContainer = connect(
  (state) => ({
    nowPlaying: state.getIn(['main', 'active', 'nowPlaying'])
  }),
  actionCreators
)(PlayRestartPlayer)

