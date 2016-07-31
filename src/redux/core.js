import R from 'ramda';

import Immutable,{Map,List,fromJS,toJS} from 'immutable';

export const INITIAL_STATE = fromJS({
    experimentId: undefined,
    questions: List(),
    responses: List(),
    active: {
        nowPlaying: undefined,
        metrics: fromJS({
            startTimeMillis: undefined,
            numPlayResumes: Map(),
            numReplays: Map()
        }),
    },
    submitted: false
});

function randInt(max) {
    return Math.floor(Math.random()*max);
}

function generateQuestions(experimentData) {
    const experimentId = experimentData.get('id')
    const questionGroups = experimentData.get('questions')

    const singleParts = List.of('Soprano', 'Alto', 'Tenor', 'Bass')
    const p1 = singleParts.get(randInt(singleParts.size))

    return fromJS(
        List.of(p1, 'Alto-Tenor', 'Alto-Tenor-Bass', 'AllParts', 'AllParts')
            .sortBy(() => Math.random())
            .map(mask => {
                const questions = questionGroups.get(mask)
                const q = questions.get(randInt(questions.size))

                const correctIndex = randInt(2)
                return {
                    experimentId,
                    choices: Immutable.Range(0, 2).map((i) => {
                        if (i === correctIndex) return fromJS({
                            name: q.get('original').split('/').pop(),
                            url: q.get('original'),
                        })
                        else return fromJS({
                            name: q.get('generated').split('/').pop(),
                            url: q.get('generated'),
                        })
                    }).toList(),
                    correctIndex,
                };
            })
            .toList()
    );
}
 export const setExperiment = (experimentData, state) => R.compose(
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
    const activeMetrics = state.getIn(['active', 'metrics']);
    const responses = state.get('responses');

    return state.merge({
        active: questions.size > 0 ? {
            question: questions.first(),
            metrics: fromJS({
                startTimeMillis: Date.now(),
                numPlayResumes: Map(),
                numReplays: Map()
            }),
        } : undefined,
        questions: questions.rest(),
        responses: (activeResponse && activeQuestion) ? responses.push(
            activeQuestion
                .merge(activeResponse)
                .merge(activeMetrics.merge({
                    endTimeMillis: Date.now()
                }))
        ) : responses
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
       // url: 'http://localhost:3000/submitResponse',
        url: 'http://bachbot-server.azurewebsites.net/submitResponse',
        type: 'POST',
        data: {
            responses: state.get('responses').toJSON(),
            userInfo: state.get('userInfo').toJSON()
        }
    });
    return state.set('submitted', true);
};

export const submitUserInfo = R.curry((userInfo, state) =>
    state.set('userInfo', userInfo)
);
