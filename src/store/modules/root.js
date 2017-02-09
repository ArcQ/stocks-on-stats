import { combineReducers } from 'redux';
import locationReducer from './location';
import { calcEpic, calcReducer, CALC_REQUEST } from './calc';
import variableFormFieldsReducer from './variable-form-fields';

// ------------------------------------
// Root Epic
// ------------------------------------

const _registeredEpics = [CALC_REQUEST];
export const rootEpic = calcEpic;

export const injectEpic = (key, asyncEpic) => {
  if (_registeredEpics.some((ele => ele === key))) return;
  rootEpic.next(asyncEpic);
};

// ------------------------------------
// Root Reducer
// ------------------------------------

export const makeRootReducer = asyncReducers =>
  combineReducers({
    location: locationReducer,
    calc: calcReducer,
    variableFormFields: variableFormFieldsReducer,
    ...asyncReducers,
  });

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default { rootEpic, makeRootReducer, injectEpic, injectReducer };
