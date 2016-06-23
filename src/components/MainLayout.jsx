import R from 'ramda';

import React,{Component} from 'react';

export default class MainLayout extends Component {
  render() {
    return <div className="app">
        <div className="ui vertical segment">
          <div className="ui container">
            <h1 className="ui header">The BachBot Challenge</h1>
            <div className="ui hidden divider"></div>
          </div>
        </div>
        <div className="ui main container">
          {this.props.children}
        </div>
      </div>;
  }
}

// TODO: PropTypes
// TODO: render quiz
// <Quiz active={active} questions={this.questions} />
