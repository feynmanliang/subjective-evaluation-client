import React,{Component,PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const {arrayOf, shape, number} = PropTypes;

export default class Results extends Component {
  static propTypes = {
    responses: arrayOf(
      PropTypes.shape({
        correctIndex: number.isRequired,
        choiceIndex: number.isRequired
      })
    ).isRequired,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  percentCorrect() {
    if (this.props.responses === undefined) return 0.0;
    else {
      const numCorrect = this.props.responses
        .filter(response => response.choiceIndex == response.correctIndex)
        .length;
      return numCorrect / this.props.responses.length;
    }
  }

  render() {
    return <div className="results">
      You scored {this.percentCorrect()}!
    </div>
  }
}
