import R from 'ramda';

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

export default class MainLayout extends Component {
  navMenu() {
    return [
      <Link key='about' className="item" to="/">About</Link>,
      <Link key='quiz' className="item" to="/quiz">Take the Challenge!</Link>
    ];
  }

  componentDidMount() {
    $(document)
      .ready(function() {
        // fix menu when passed
        $('.masthead')
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
          .sidebar('attach events', '.toc.item');
      });
  }

  render() {
    return (
      <div className="app">
        <div className="ui large top fixed hidden menu">
          <div className="ui container">
            {this.navMenu()}
          </div>
        </div>

        <div className="ui vertical inverted sidebar menu left">
          {this.navMenu()}
        </div>

        <div className="pusher">
          <div className="ui inverted vertical masthead center aligned segment">
            <div className="ui container">
              <div className="ui large secondary inverted pointing menu">
                <a className="toc item">
                  <i className="sidebar icon"></i>
                </a>
                {this.navMenu()}
              </div>
            </div>
          </div>
          {this.props.children}
        </div>
        <div className="ui inverted vertical footer segment">
          <div className="ui container">
            <div className="ui stackable inverted divided equal height stackable grid">
            </div>
          </div>
        </div>
      </div>
    );
  }
}
