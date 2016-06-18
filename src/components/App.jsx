import React from 'react';

export default React.createClass({
  // TODO: proptypes, ES6 class extends syntax
  getChoices: function() {
    return this.props.question ? this.props.question.choices : undefined;
  },
  getCorrectIndex: function() {
    return this.props.question ? this.props.question.correctIndex : undefined;
  },
  getResponse: function() {
    return this.props.response || undefined;
  },
  render: function() {
    return <div className="app">
      {this.getChoices().map((choice,index) =>
        <button key={choice}
                onClick={() => this.props.choose(index)}>
          <h1>{choice}</h1>
        </button>
      )}
    </div>;
  }
});
