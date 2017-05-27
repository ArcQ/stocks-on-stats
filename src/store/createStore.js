import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, compose, createStore } from 'redux';
import { browserHistory } from 'react-router';
import { makeRootReducer, rootEpic } from './modules/root';
import { updateLocation, redirectToCalcResults } from './modules/location';
import persistState from 'redux-localstorage';

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const epicMiddleware = createEpicMiddleware(rootEpic);

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];

  let composeEnhancers = compose;
  if (process.env.NODE_ENV === 'development') {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(epicMiddleware),
      ...enhancers,
      persistState('calc'),
    ),
  );
  store.asyncReducers = {};

  // to unsubscribe, call respective methods (calling twice unsubscribes)
  store.unsubscribeCalcRequest = store.subscribe(redirectToCalcResults(store));
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

  if (module.hot) {
    module.hot.accept('./modules/root', () => {
      // eslint-disable-next-line global-require
      const reducers = require('./modules/root').makeRootReducer;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};
