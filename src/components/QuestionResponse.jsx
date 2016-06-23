import React,{Component,PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Boombox from './Boombox';

const {shape, array, string, number} = PropTypes;

export default class QuestionResponse extends Component {
  static propTypes = {
    question: shape({
      experimentId: string.isRequired,
      choices: array.isRequired,
      correctIndex: number.isRequired
    }).isRequired,
    response: shape({
      choiceIndex: number.isRequired
    })
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  getChoices() {
    if (this.props.question) {
      console.log(this.props.question);
      return this.props.question.choices.map((choice,index) =>
          <div key={choice.name}>
            <button className={"ui button" + (this.isChosen() ? " active" : "")}
                    onClick={() => this.props.choose(choice.url)}>
              <h1>{choice.name}</h1>
            </button>
            <Boombox />
            <br />
          </div>
      );
    }
  }

  isChosen(index) {
    return this.props.response && this.props.response.choiceIndex === index;
  }

  render() {
    return <div className="choices">
      {this.getChoices()}
    </div>;
  }
};
