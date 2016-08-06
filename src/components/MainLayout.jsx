import R from 'ramda';

import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router'

export default class MainLayout extends Component {
  navMenu() {
    return [
      <IndexLink key="about" activeClassName="active" className="item" to="/">About</IndexLink>,
      <Link key="quiz" activeClassName="active" className="item" to="/quiz">Take the Challenge</Link>
    ];
  }

  socialButtons() {
    return (<div className="right menu inverted">
      <div className="item">
        <iframe width="59" height="20" scrolling="no" frameBorder="0" allowTransparency="true"
            src="https://www.facebook.com/plugins/share_button.php?href=http%3A%2F%2Fbachbot.com&layout=button&size=small&mobile_iframe=true&width=59&height=20&appId"
            style={{
              border: 'none',
              overflow: 'hidden'
            }}></iframe>
        <iframe id="twitter-widget-0" scrolling="no" frameBorder="0" allowTransparency="true"
            className="twitter-share-button twitter-share-button-rendered twitter-tweet-button"
            title="Twitter Tweet Button"
            src="https://platform.twitter.com/widgets/tweet_button.a9003d9964444592507bbb36b98c709b.en.html#dnt=false&amp;id=twitter-widget-0&amp;lang=en&amp;original_referer=http%3A%2F%2Fbachbot.com%2F&amp;size=m&amp;text=Can%20you%20tell%20Bach%20apart%20from%20a%20computer%3F%20Take%20the%20BachBot%20challenge%20now!&amp;type=share&amp;url=http%3A%2F%2Fbachbot.com&amp"
            style={{
              position: 'static',
              visibility: 'visible',
              width: '60px',
              height: '20px'
            }}
            data-url="http://bachbot.com"></iframe>
        <iframe className="github"
            src="https://ghbtns.com/github-btn.html?user=feynmanliang&amp;repo=bachbot&amp;type=watch&amp;count=true"
            allowTransparency="true" frameBorder="0" scrolling="0" width="100" height="20"></iframe>
      </div>
    </div>);
  }

  componentDidMount() {
    $(document)
      .ready(() => {
        // fix menu when passed
        $(this.refs.navbar)
          .visibility({
            once: false,
            onBottomPassed: function() {
              $('.fixed.menu').transition('fade in');
            },
            onBottomPassedReverse: function() {
              $('.fixed.menu').transition('fade out');
            }
          });

          // create sidebar and attach to menu open
          $('.ui.sidebar')
            .sidebar({ context: $('#app') })
            .sidebar('setting', 'transition', 'overlay')
            .sidebar('attach events', '.toc.item');
      });
  }

  render() {
    return (
      <div id="app">
        <div className="ui large top fixed hidden menu">
          <div className="ui container">
            {this.navMenu()}
            {this.socialButtons()}
          </div>
        </div>

        <div className="ui vertical inverted sidebar menu left">
          {this.navMenu()}
          {this.socialButtons()}
        </div>

        <div className="pusher">
          <div ref="navbar" id="navbar" className="ui inverted vertical masthead center aligned segment">
            <div className="ui container">
              <div className="ui large secondary inverted pointing menu">
                <a className="toc item">
                  <i className="sidebar icon"></i>
                </a>
                {this.navMenu()}
                {this.socialButtons()}
              </div>
            </div>
          </div>
          {this.props.children}
        </div>
        <div className="ui inverted vertical footer segment">
          <div className="ui container">
            <div className="ui stackable inverted divided equal height stackable grid">
              <div className="one wide column">
              </div>
              <div className="nine wide column">
                <h4 className="ui inverted header">Data Policy</h4>
                <p>
                  We collect anonymized data for research purposes only.
                  Your data is never sold, shared, or used for commercial or marketing purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
