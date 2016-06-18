import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  // TODO: proptypes, ES6 class extends syntax
  mixins: [PureRenderMixin],
  getChoices: function() {
    return this.props.question ? this.props.question.choices : [];
  },
  isChosen: function(index) {
    return this.props.response && this.props.response.choiceIndex === index;
  },
  render: function() {
    return <div className="app">
      {this.getChoices().map((choice,index) =>
        <button key={choice}
                className={"ui button" + (this.isChosen() ? " active" : "")}
                onClick={() => this.props.choose(index)}>
          <h1>{choice}</h1>
        </button>
      )}
    </div>;
  }
});
