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
          <a href="https://github.com/feynmanliang/bachbot">
            <img style={{
              position: 'absolute',
              top: 0,
              right: 0,
              border: 0,
              zIndex: 1
            }} src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png" />
          </a>

          <div ref="navbar" className="ui inverted vertical masthead center aligned segment">
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
