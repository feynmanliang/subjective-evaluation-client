import R from 'ramda';

import Immutable,{Map,List,fromJS,toJS} from 'immutable';
import randomSubset from 'random-array-subset';

export const INITIAL_STATE = fromJS({
    experimentId: undefined,
    questions: [],
    responses: [],
    active: {}
});

// export const setExperiment = (experimentData) => R.compose(
//     setQuestions(generateQuestions(experimentData)),
//     setExperimentId(experimentData.id)
// );
export const setExperiment = (experimentData, state) => {
    return next(
        setQuestions(
            generateQuestions(experimentData),
            setExperimentId(experimentData.get('id'), state)));
};

export const setExperimentId = ((id, state) =>
    state.set('experimentId', id));

export const setQuestions = ((questions, state) =>
    state.set('questions', questions));

export function next(state) {
    const questions = state.get('questions');
    const activeQuestion = state.getIn(['active','question']);
    const activeResponse = state.getIn(['active','response']);
    const responses = state.get('responses');

    return state.merge({
        active: questions.size > 0 ?
            {
                question: questions.first(),
            } :
            undefined,
        questions: questions.rest(),
        responses: (activeResponse && activeQuestion) ?
            responses.push(activeQuestion.merge(activeResponse)) : responses,
    });
}

export const respond = R.curry((activeState, response) =>
    activeState.merge({
        response
    }));

function generateQuestions(experimentData) {
    const NUM_QUESTIONS = 5;
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
        const correctIndex = randomSubset(R.range(0, numChoices), NUM_ORIG_PER_Q)[0]; // TODO: support multiple correct

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
