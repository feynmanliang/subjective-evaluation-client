import Immutable from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import reducers from './reducer';
import routeReducer from './routeReducer';

export default function configureStore(initialState) {
  const middleware = routerMiddleware(hashHistory);
  const store = createStore(
    combineReducers({
      ...reducers,
      routing: routeReducer
    }),
    initialState,
    compose(
      applyMiddleware(middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ));
  return store;
}
