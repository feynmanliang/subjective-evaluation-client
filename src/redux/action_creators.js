import { push } from 'react-router-redux';

export function setExperiment(experimentData) {
  return {
    type: 'SET_EXPERIMENT',
    experimentData
  };
}

export function updateChoice(response) {
  return {
    type: 'UPDATE_CHOICE',
    response
  };
}

export function next() {
  return {
    type: 'NEXT'
  };
}

export function navigateTo(path) {
  return push(path);
}

export function playResumeSound(name) {
  return {
    type: 'PLAY_RESUME_SOUND',
    name
  }
}

export function pauseSound(name) {
  return {
    type: 'PAUSE_SOUND',
    name
  }
}

export function replaySound(name) {
  return {
    type: 'REPLAY_SOUND',
    name
  }
}

