import React,{Component,PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class QuestionResponse extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  getChoices() {
    return this.props.question ? this.props.question.choices : [];
  }

  isChosen(index) {
    return this.props.response && this.props.response.choiceIndex === index;
  }

  render() {
    return <div className="app">
      {this.getChoices().map((choice,index) =>
        <button key={choice.name}
                className={"ui button" + (this.isChosen() ? " active" : "")}
                onClick={() => this.props.choose(index)}>
          <h1>{choice.url}</h1>
        </button>
      )}
    </div>;
  }
};

QuestionResponse.propTypes = {
  question: PropTypes.shape({
    experimentId: PropTypes.string.isRequired,
    choices: PropTypes.array.isRequired,
    correctIndex: PropTypes.number.isRequired
  }).isRequired,
  response: PropTypes.shape({
    choiceIndex: PropTypes.number.isRequired
  })
};

QuestionResponse.defaultProps = {};
