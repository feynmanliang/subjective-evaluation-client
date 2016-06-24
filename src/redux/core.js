import R from 'ramda';

import Immutable,{Map,List,fromJS,toJS} from 'immutable';
import randomSubset from 'random-array-subset';

export const INITIAL_STATE = fromJS({
    experimentId: undefined,
    questions: List(),
    responses: List(),
    active: {
        nowPlaying: undefined,
        metrics: fromJS({
            numPlayResumes: Map(),
            numReplays: Map()
        }),
    },
    submitted: false
});

function generateQuestions(experimentData) {
    const NUM_QUESTIONS = 2;
    // TODO: extend these to be > 1 so can have more than bach vs not
    const NUM_GEN_PER_Q = 1;
    const NUM_ORIG_PER_Q = 1;

    const numChoices = NUM_GEN_PER_Q + NUM_ORIG_PER_Q;

    const experimentId = experimentData.get('id')
    const original = experimentData.get('original')
    const generated = experimentData.get('generated')

    return fromJS(Immutable.Range(0, NUM_QUESTIONS).map(() => {
        // TODO: make this code pure
        // the originals are the "correct" responses
        const correctChoices = randomSubset(R.range(0, original.size), NUM_ORIG_PER_Q).map(i => original.get(i));
        const incorrectChoices = randomSubset(R.range(0, generated.size), NUM_GEN_PER_Q).map(i => generated.get(i));
        // TODO: support multiple correct
        const correctIndex = randomSubset(R.range(0, numChoices), NUM_ORIG_PER_Q)[0];

        return {
            experimentId,
            choices: Immutable.Range(0, numChoices).map((i) => {
                if (i === correctIndex) return correctChoices.pop();
                else return incorrectChoices.pop();
            }).toList(),
            correctIndex,
        };
    }).toList());
}
 export const setExperiment = (experimentData, state) => R.compose(
     next,
     setQuestions(generateQuestions(experimentData)),
     setExperimentId(experimentData.id))(state);

export const setExperimentId = R.curry((id, state) =>
    state.set('experimentId', id));

export const setQuestions = R.curry((questions, state) =>
    state.set('questions', questions));

export const next = (state) => {
    const questions = state.get('questions');
    const activeQuestion = state.getIn(['active','question']);
    const activeResponse = state.getIn(['active','response']);
    const responses = state.get('responses');

    return state.merge({
        active: questions.size > 0 ? {
            question: questions.first(),
            metrics: fromJS({
                numPlayResumes: Map(),
                numReplays: Map()
            }),
        } : undefined,
        questions: questions.rest(),
        responses: (activeResponse && activeQuestion) ?
            responses.push(activeQuestion
                           .merge(activeResponse)
                           .merge(state.getIn(['active', 'metrics']))) : responses,
    });
}

export const updateChoice = R.curry((response, active) =>
    active.merge({
        response
    }));

export const playResumeSound = R.curry((name, active) =>
    active
        .set('nowPlaying', name)
        .updateIn(['metrics','numPlayResumes', name], 0, n => (n + 1))
);

export const pauseSound = R.curry((name, active) =>
    active
        .set('nowPlaying', undefined)
);

export const replaySound = R.curry((name, active) =>
    active
        .set('nowPlaying', name)
        .updateIn(['metrics','numReplays', name], 0, n => (n + 1))
);

export const submitResponses = (state) => {
    $.ajax({
        url: 'http://localhost:3000/submitResponse',
        type: 'POST',
        data: responses: state.get('responses').toJSON()
    });
    return state.set('submitted', true);
};
