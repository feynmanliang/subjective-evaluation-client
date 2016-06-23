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

export function next() {
  return {
    type: 'NEXT'
  };
}

export function navigateTo(path) {
  return push(path);
}
