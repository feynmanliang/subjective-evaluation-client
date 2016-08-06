import R from 'ramda';

import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router'

export default class MainLayout extends Component {
  componentDidMount() {
    // Allow for console.log to not break IE
    if (typeof window.console == "undefined" || typeof window.console.log == "undefined") {
      window.console = {
        log  : function() {},
        info : function(){},
        warn : function(){}
      };
    }
    if(typeof window.console.group == 'undefined' || typeof window.console.groupEnd == 'undefined' || typeof window.console.groupCollapsed == 'undefined') {
      window.console.group = function(){};
      window.console.groupEnd = function(){};
      window.console.groupCollapsed = function(){};
    }
    if(typeof window.console.markTimeline == 'undefined') {
      window.console.markTimeline = function(){};
    }
    window.console.clear = function(){};

    $(document).ready(() => {

      // selector cache
      var
        $menu                = $('#toc'),
        requestAnimationFrame = window.requestAnimationFrame
          || window.mozRequestAnimationFrame
          || window.webkitRequestAnimationFrame
          || window.msRequestAnimationFrame
          || function(callback) { setTimeout(callback, 0); };

      // main sidebar
      $menu
        .sidebar({
            context          : $('#content'),
            dimPage          : true,
            transition       : 'overlay',
            mobileTransition : 'uncover',
        })
        .sidebar('attach events', '.launch.button, .view-ui, .launch.item');

      // fixed top menu
      if($(window).width() > 600) {
        $('body')
          .visibility({
            offset         : -10,
            observeChanges : false,
            once           : false,
            continuous     : false,
            onTopPassed: function() {
              requestAnimationFrame(function() {
                $('.following.bar')
                  .addClass('light fixed')
                  .find('.menu')
                  .removeClass('inverted')
                ;
              });
            },
            onTopPassedReverse: function() {
              requestAnimationFrame(function() {
                $('.following.bar')
                  .removeClass('light fixed')
                  .find('.menu')
                    .addClass('inverted')
                ;
              });
            }
          });
      }
    });
  }

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

  render() {
    return (
      <div id="app" className="app">

        <div className="following bar">
          <div className="ui container">
            <div className="ui large secondary network inverted menu">
              <a className="view-ui item">
                <i className="sidebar icon"></i>
              </a>
              {this.navMenu()}
              {this.socialButtons()}
            </div>
          </div>
        </div>

        <div className="ui fixed inverted main menu">
          <div className="ui container">
            <a className="launch icon item">
              <i className="content icon"></i>
            </a>
            <div className="right menu">
              <div className="vertically fitted borderless item">
                <iframe className="github"
                    src="https://ghbtns.com/github-btn.html?user=feynmanliang&amp;repo=bachbot&amp;type=watch&amp;count=true"
                    allowTransparency="true" frameBorder="0" scrolling="0" width="100" height="20"></iframe>
              </div>
            </div>
          </div>
        </div>

        <div id="content">

          <div className="ui vertical inverted sidebar menu left" id="toc"
              style={{padding: "2.5rem 0"}}>
            {this.navMenu()}
            {this.socialButtons()}
          </div>

          <div className="ui black big launch right attached fixed button">
            <i className="content icon"></i>
            <span className="text">Menu</span>
          </div>

          <div className="pusher">
            <div className="full height" style={{padding: "2rem 0 0 0"}}>
              {this.props.children}
            </div>

            <div className="ui black inverted vertical footer segment">
              <div className="ui center aligned container">
                <div className="ui left aligned inverted segment">
                  <h4 className="ui inverted teal header">Data Policy</h4>
                  <p>
                    We collect anonymized data for research purposes only.
                    Your data is never sold, shared, or used for commercial or marketing purposes.
                  </p>
                </div>
                <div className="ui inverted section divider"></div>
                <p className="ui inverted small segment item">
                  This work was completed as part of a thesis project for Cambridge University's <a href="http://www.mlsalt.eng.cam.ac.uk/">MPhil in Machine Learning, Speech, and Language Technology</a>.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    );
  }
}
