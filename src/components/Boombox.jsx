import React,{Component,PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Boombox extends Component {
  static propTypes = {
    boombox: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    mp3Path: PropTypes.string.isRequired
  };

  componentDidMount() {
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

  onPlayClick() {
    this.props.boombox.get(this.props.name).play();
  }
  onStopClick() {
    this.props.boombox.get(this.props.name).stop();
  }
  onPauseClick() {
    this.props.boombox.get(this.props.name).pause();
  }
  onResumeClick() {
    this.props.boombox.get(this.props.name).resume();
  }
  onReplayClick() {
    this.props.boombox.get(this.props.name).replay();
  }
  onVolumeChange(e) {
    const volume = e.currentTarget.value;
    this.props.boombox.get(this.props.name).volume(volume);
  }

  render() {
    return <div className="boombox">
      <div className="btn-group">
        <button ref="play" className="btn btn-success btn-sm" onClick={::this.onPlayClick}>Play</button>
        <button ref="stop" className="btn btn-success btn-sm" onClick={::this.onStopClick}>Stop</button>
        <button ref="pause" className="btn btn-success btn-sm" onClick={::this.onPauseClick}>Pause</button>
        <button ref="resume" className="btn btn-success btn-sm" onClick={::this.onResumeClick}>Resume</button>
        <button ref="replay" className="btn btn-success btn-sm" onClick={::this.onReplayClick}>Replay</button>
      </div>
      <div className="volume">
        <span className="glyphicon glyphicon glyphicon-volume-off"></span>
        <input ref="volume" type="range" min="0" max="1" step="0.1" onChange={::this.onVolumeChange} />
        <span className="glyphicon glyphicon-volume-up"></span>
      </div>
    </div>
  }
}
