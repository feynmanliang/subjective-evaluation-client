import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link } from 'react-router'

export default class About extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div>
        <div className="ui vertical inverted masthead center aligned segment">
          <div className="ui text container">
            <h1 className="ui inverted header">
              The BachBot Challenge
            </h1>
            <h2>Can you tell the difference between Bach and a computer?</h2>
            <Link className="ui huge primary button" to="/quiz">
              Test Yourself<i className="right arrow icon"></i>
            </Link>
          </div>
        </div>

        <div className="ui vertical stripe segment">
          <div className="ui text container">

            <h2 className="ui header">Challenge description</h2>
            <p>
              We will present you with some short samples of music which are
              either extracted from Bach's own work or generated by BachBot.
              Your task is to listen to both and identify the Bach originals.
            </p>
            <p>
              To ensure fair comparison, all scores are transposed to
              C-major or A-minor and set to 120 BPM.
            </p>

            <h2 className="ui header">Help advance research in creative AI</h2>
            <p>
              We will use your anonymized responses as a valuable feedback signal
              for training the model.
            </p>

            <div className="ui header divider"></div>

            <h2 className="ui header">Want to Listen?</h2>

            <iframe scrolling="no"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/246633991&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"
                  width="100%" height="450" scrolling="no" frameBorder="0">
                This was supposed to display an embedded <a href="https://soundcloud.com/deepjazz-ai/sets">SoundCloud</a> app.

                Your browser does not support iframes and/or SoundCloud is blocked by your internet provider.
            </iframe>

            <div className="ui header divider"></div>

            <h2 className="ui header">What is BachBot</h2>
            <p>
              BachBot is a research project on computational creativity. Our
              goal is to build artificial intelligence which can generate
              and harmonize chorales in a way that's indistinguishable from
              Bach's own work. Through studying music composition, a task
              requiring both creativity and understanding of music theory,
              we hope to gain insight on the mechanisms underlying music and
              creativity as well as push the limits of modern AI.
            </p>
            <p>
              The project utilizes a probabilistic sequence model called <a href="https://colah.github.io/posts/2015-08-Understanding-LSTMs/">long short-term
              memory</a>. For more details, check out <a href="https://github.com/feynmanliang/bachbot">our code on Github</a>.
            </p>

            <div className="ui header divider"></div>

            <h2 className="ui header">About the authors</h2>
            <div className="ui list">
              <div className="item">
                <div className="content">
                  <div className="header"><a href="https://github.com/feynmanliang">Feynman Liang</a></div>
                  <div className="description">Department of Engineering, University of Cambridge</div>
                </div>
              </div>
              <div className="item">
                <div className="content">
                  <div className="header"><a href="http://cms.mus.cam.ac.uk/directory/mark-gotham">Mark Gotham</a></div>
                  <div className="description">Faculty of Music, University of Cambridge</div>
                </div>
              </div>
              <div className="item">
                <div className="content">
                  <div className="header">Marcin Tomczak</div>
                  <div className="description">Department of Engineering, University of Cambridge</div>
                </div>
              </div>
              <div className="item">
                <div className="content">
                  <div className="header"><a href="https://www.microsoft.com/en-us/research/people/matjoh/">Matthew Johnson</a></div>
                  <div className="description">Microsoft Research Cambridge</div>
                </div>
              </div>
              <div className="item">
                <div className="content">
                  <div className="header"><a href="https://www.microsoft.com/en-us/research/people/jamiesho/">Jamie Shotton</a></div>
                  <div className="description">Microsoft Research Cambridge</div>
                </div>
              </div>
            </div>

            <div className="ui header divider"></div>

            This work was completed as part of a thesis in Cambridge University's <a href="http://www.mlsalt.eng.cam.ac.uk/">MPhil in Machine Learning, Speech and Language Technology</a>.

          </div>
        </div>
      </div>
    );
  }
}

