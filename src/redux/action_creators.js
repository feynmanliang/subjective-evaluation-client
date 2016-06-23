import { push } from 'react-router-redux';

export function setExperiment(experimentData) {
  return {
    type: 'SET_EXPERIMENT',
    experimentData
  };
}

export function respond(response) {
  return {
    type: 'RESPOND',
    response
  };
}

export function playSound(name) {
  return {
    type: 'PLAY_SOUND',
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

export function next() {
  return {
    type: 'NEXT'
  };
}

export function navigateTo(path) {
  return push(path);
}
