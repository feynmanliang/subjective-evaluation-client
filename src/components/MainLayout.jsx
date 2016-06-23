import R from 'ramda';

import React,{Component} from 'react';

const data = {
    "id": "testExperiment",
    "original": [
        {
            "name": "Beethoven",
            "url": "http://www.midiworld.com/classic.htm/beethoven.htm"
        },
        {
            "name": "Bach",
            "url": "http://www.midiworld.com/midis/other/c1/J_C_Bach_Ach_dass_ich_Wassers_gnug_hatte.mid"
        }
    ],
    "generated": [
        {
            "name": "Hindemith",
            "url": "http://www.midiworld.com/midis/other/c1/hindbsn1.mid"
        },
        {
            "name": "Poulenc",
            "url": "http://www.midiworld.com/midis/other/poulenc/poulcmo1.mid"
        }
    ]
};

function makeProps(experimentData) {
  const experimentId = experimentData.id
  const original = experimentData.original
  const generated = experimentData.generated

  let questions = []
  for (let i = 0; i < 5; ++i) {
    // TODO: support 1 orig vs multile genereated
    // TODO: support multiple origs (requires multiple correctIndex)
    // TODO: make number of questions configurable in experiment.json
    // TODO: make num orig vs num gen configurable in experiment.json
    const origIdx = Math.floor(Math.random() * original.length);
    const genIdx = Math.floor(Math.random() * generated.length); // TODO: prevent duplicate questions

    let choices = [ original[origIdx], generated[genIdx] ];
    const correctIndex = Math.floor(Math.random() * choices.length);
    choices[0] = choices[correctIndex]
    choices[correctIndex] = original[origIdx]

    const question = {
      experimentId,
      choices,
      correctIndex
    }
    questions.push(question);
  }

  return {
    active: {
      question: R.head(questions)
    },
    questions: R.tail(questions)
  };
}

export default class MainLayout extends Component {
  render() {
    return <div className="app">
        <header className="primary-header"></header>
        <aside className="primary-aside"></aside>
        <main>
          {React.cloneElement(this.props.children, makeProps(data))}
        </main>
      </div>;
  }
}

// TODO: PropTypes
// TODO: render quiz
// <Quiz active={active} questions={this.questions} />
