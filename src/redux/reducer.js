import {fromJS} from 'immutable';
import {reducer as formReducer} from 'redux-form/immutable';

import {
    setExperiment,
    setExperimentId,
    setQuestions,
    next,
    updateChoice,
    playResumeSound,
    pauseSound,
    replaySound,
    submitResponses,
    submitUserInfo,
    INITIAL_STATE
} from './core';

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
            // TODO: DRY this up with a sub-reducer
            case 'UPDATE_CHOICE':
                return state.update('active', active => updateChoice(fromJS(action.response), active));
            case 'PLAY_RESUME_SOUND':
                return state.update('active', active => playResumeSound(fromJS(action.name), active));
            case 'PAUSE_SOUND':
                return state.update('active', active => pauseSound(fromJS(action.name), active));
            case 'REPLAY_SOUND':
                return state.update('active', active => replaySound(fromJS(action.name), active));
            case 'SUBMIT_RESPONSES':
                return submitResponses(state);
            case 'SUBMIT_USER_INFO':
                return submitUserInfo(state, action.userInfo);
        }

        return state;
    },
    form: formReducer
}
