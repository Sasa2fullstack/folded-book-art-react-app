/* globals window */
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createLogger } from 'redux-logger';

import sagas from './sagas';
import reducers from './reducers';

export const history = createBrowserHistory({});

const configureStore = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger());
  }

  const enhancers = [
    applyMiddleware(...middlewares), // empty for now;
  ];

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-disable no-underscore-dangle */

  const store = createStore(
    combineReducers({
      router: connectRouter(history),
      ...reducers,
    }),
    initialState,
    composeEnhancers(...enhancers),
  );

  store.sagaTask = sagaMiddleware.run(sagas);

  return store;
};

export default configureStore;
