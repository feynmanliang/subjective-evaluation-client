import React from 'react';
import QuestionResponse from './QuestionResponse';
import Results from './Results';

export default React.createClass({
  isFinished: function() {
    return this.props.active === undefined && this.props.questions && this.props.questions.length === 0;
  },
  render: function() {
    return <div>
      {this.isFinished() ?
        <Results ref="results" responses={this.props.responses} /> :
        <QuestionResponse {...this.props} />}
    </div>
  }
});
