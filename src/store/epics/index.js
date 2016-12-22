import { combineEpics } from 'redux-observable';
import locationReducer from './location';
import dataReducer from './reducers/data';

export const makeRootReducer = asyncReducers =>
  combineEpics({
    location: locationReducer,
    data: dataReducer,
    ...asyncReducers,
  });

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
