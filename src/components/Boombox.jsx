import React,{Component,PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import * as actionCreators from '../redux/action_creators';

const { object, string, func } = PropTypes;

export class Boombox extends Component {
  static propTypes = {
    boombox: object.isRequired,
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
    // TODO: manage boombox in redux state
    this.props.boombox.load(this.props.name, options);
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
    this.stopOtherSounds();

    const webaudio = this.props.boombox.get(this.props.name);
    if (webaudio.state.time.playback === undefined) {
      webaudio.play();
    } else {
      webaudio.resume();
    }
    this.props.playResumeSound(this.props.name);
  }

  onPauseClick() {
    this.props.boombox.get(this.props.name).pause();
    this.props.pauseSound(this.props.name);
  }

  onReplayClick() {
    this.stopOtherSounds();
    this.props.boombox.get(this.props.name).replay();
    this.props.replaySound(this.props.name);
  }

  playPauseButton() {
    if (this.isPlaying()) {
      return <i ref="pause" className="pause icon" onClick={::this.onPauseClick}></i>
    } else {
      return <i ref="play" className="play icon" onClick={::this.onPlayClick}></i>
    }
  }

  render() {
    return <div className="boombox">
      <div className="btn-group">
        {::this.playPauseButton()}
        <i ref="replay" className="fast backward icon" onClick={::this.onReplayClick}></i>
      </div>
    </div>
  }
}

export const BoomboxContainer = connect(
  (state) => ({
    nowPlaying: state.getIn(['main', 'active', 'nowPlaying'])
  }),
  actionCreators
)(Boombox)
