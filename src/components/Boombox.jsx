import React,{Component,PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Boombox extends Component {
  static propTypes = {
    boombox: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    mp3Path: PropTypes.string.isRequired
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
    this.props.boombox.load(this.props.name, options);
  }

  stopOtherSounds() {
    Object.keys(this.props.boombox.pool)
      .filter(k => k !== this.props.name)
      .map(name => this.props.boombox.get(name).stop());
  }

  isPlaying() {
    const thisBoombox = this.props.boombox.get(this.props.name);
    return (thisBoombox.state.time.paused === undefined)
      && (thisBoombox.state.time.playback !== undefined);
  }

  onPlayClick() {
    this.stopOtherSounds();

    const thisBoombox = this.props.boombox.get(this.props.name);
    if (thisBoombox.state.time.playback === undefined) {
      thisBoombox.play();
    } else {
      thisBoombox.resume();
    }
  }

  onPauseClick() {
    this.props.boombox.get(this.props.name).pause();
  }

  onReplayClick() {
    this.stopOtherSounds();
    this.props.boombox.get(this.props.name).replay();
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
