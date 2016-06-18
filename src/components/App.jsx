import React,{Component,PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import QuestionResponse from './QuestionResponse';
import Results from './Results';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  isFinished() {
    return this.props.active === undefined && (!this.props.questions || this.props.questions.length === 0);
  }

  render() {
    return <div>
      {this.isFinished() ?
        <Results ref="results" responses={this.props.responses} /> :
        <QuestionResponse {...this.props.active} />}
    </div>
  }
}

App.propTypes = {
  // TODO: reuse proptypes in subcomponents, DRY
  active: PropTypes.shape({
    question: PropTypes.shape({
      experimentId: PropTypes.string.isRequired,
      choices: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired
        })
      ).isRequired,
      correctIndex: PropTypes.number.isRequired
    }),
    response: PropTypes.shape({
      choiceIndex: PropTypes.number.isRequired
    })
  }),
  questions: PropTypes.array,
  responses: PropTypes.array
};

App.defaultProps = {};
