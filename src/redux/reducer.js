import {fromJS} from 'immutable';

import {setExperiment, setExperimentId, setQuestions, next, respond, INITIAL_STATE} from './core';

export default {
    main: (state = INITIAL_STATE, action) => {
        switch (action.type) {
            case 'SET_EXPERIMENT':
                return setExperiment(fromJS(action.experimentData), state);
            case 'SET_EXPERIMENT_ID':
                return setExperimentId(fromJS(action.experimentId), state);
            case 'SET_QUESTIONS':
                return setQuestions(fromJS(action.questions), state);
            case 'NEXT':
                return next(state);
            case 'RESPOND':
                return state.update('active', activeState => respond(activeState, fromJS(action.response)));
        }
        return state;
    }
}
