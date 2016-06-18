import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import QuestionResponse from './QuestionResponse';
import Results from './Results';

export default React.createClass({
  // TODO: proptypes, ES6 class extends syntax
  mixins: [PureRenderMixin],
  isFinished: function() {
    return this.props.active === undefined && (!this.props.questions || this.props.questions.length === 0);
  },
  render: function() {
    return <div>
      {this.isFinished() ?
        <Results ref="results" responses={this.props.responses} /> :
        <QuestionResponse {...this.props.active} />}
    </div>
  }
});
