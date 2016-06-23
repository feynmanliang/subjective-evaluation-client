import R from 'ramda';

import React,{Component} from 'react';

export default class MainLayout extends Component {
  render() {
    return <div className="app">
        <header className="primary-header"></header>
        <aside className="primary-aside"></aside>
        <main>
          {this.props.children}
        </main>
      </div>;
  }
}

// TODO: PropTypes
// TODO: render quiz
// <Quiz active={active} questions={this.questions} />
