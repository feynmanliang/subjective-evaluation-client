import React from 'react';

export default React.createClass({
  percentCorrect: function() {
    const numCorrect = this.props.responses
      .filter(response => response.choiceIndex == response.correctIndex)
      .length
    return numCorrect / this.props.responses.length;
  },
  render: function() {
    return <div className="results">
      You scored {this.percentCorrect()}!
    </div>
  }
});
