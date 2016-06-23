import React,{Component,PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const boombox = require('boombox-js');

export default class Boombox extends Component {
  componentDidMount() {
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
    this.bgm = ["bgm", "./media/sound.m4a"];
    this.options = {
      src: [
        {
          media: 'audio/mp4',
          path: './media/sound.m4a'
        }
      ]
    };
    boombox.load('single', this.options, function (err, htmlaudio) {
      console.log("## sound loaded. used: " + boombox.pool.single.constructor.name);
    });
  }

  onPlayClick() {
    boombox.get('single').play();
    console.log('## play');
  }
  onStopClick() {
    boombox.get('single').stop();
    console.log('## stop');
  }
  onPauseClick() {
    boombox.get('single').pause();
    console.log('## pause');
  }
  onResumeClick() {
    boombox.get('single').resume();
    console.log('## resume');
  }
  onReplayClick() {
    boombox.get('single').replay();
    console.log('## replay');
  }
  onVolumeChange(e) {
    var volume = e.currentTarget.value;
    console.log('## volume: ' + volume);
    boombox.get('single').volume(volume);
  }

  render() {
    return <div className="boombox">
      <div className="btn-group">
        <button ref="play" className="btn btn-success btn-sm" onClick={this.onPlayClick}>Play</button>
        <button ref="stop" className="btn btn-success btn-sm" onClick={this.onStopClick}>Stop</button>
        <button ref="pause" className="btn btn-success btn-sm" onClick={this.onPauseClick}>Pause</button>
        <button ref="resume" className="btn btn-success btn-sm" onClick={this.onResumeClick}>Resume</button>
        <button ref="replay" className="btn btn-success btn-sm" onClick={this.onReplayClick}>Replay</button>
      </div>
      <div className="volume">
        <span className="glyphicon glyphicon glyphicon-volume-off"></span>
        <input ref="volume" type="range" min="0" max="1" step="0.1" onChange={this.onVolumeChange} />
        <span className="glyphicon glyphicon-volume-up"></span>
      </div>
    </div>
  }
}
