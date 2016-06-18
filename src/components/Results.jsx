import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  // TODO: proptypes, ES6 class extends syntax
  mixins: [PureRenderMixin],
  percentCorrect: function() {
    if (this.props.responses === undefined) return 0.0;
    else {
      const numCorrect = this.props.responses
        .filter(response => response.choiceIndex == response.correctIndex)
        .length;
      return numCorrect / this.props.responses.length;
    }
  },
  render: function() {
    return <div className="results">
      You scored {this.percentCorrect()}!
    </div>
  }
});
