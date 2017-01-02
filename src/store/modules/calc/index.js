import { createSelector } from 'reselect';
import YqlFacade from './utils/yql/yql-facade';

const uuid = require('node-uuid');
// ------------------------------------
// Constants
// ------------------------------------
const _STATE_IDLE = 0;
const _STATE_PROCESSING = 1;

export const CALC_REQUEST = 'CALC_REQUEST';
export const NOTIFY_CALC_FINISH = 'NOTIFY_REQUEST_FINISH';
export const CALC_REQUEST_ERR = 'CALC_REQUEST_ERR';

// ------------------------------------
// Actions
// ------------------------------------
export function makeCalc(...args) {
  return {
    type: CALC_REQUEST,
    payload: args,
  };
}

export function finishCalcSuccess(calcType, response) {
  return {
    type: NOTIFY_CALC_FINISH,
    calcType,
    data: response,
  };
}

// TODO add error scenario
export function finishCalcErr(err = 'an error occurred') {
  return {
    type: CALC_REQUEST_ERR,
    err,
  };
}

export const actions = {
  makeCalc,
  finishCalcSuccess,
  finishCalcErr,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CALC_REQUEST]: state => Object.assign(
    {},
    state,
    {
      requestState: _STATE_PROCESSING,
    },
  ),
  [NOTIFY_CALC_FINISH]: (state, action) => Object.assign(
    {},
    state,
    {
      calcList: [...state.calcList, {
        calcId: uuid.v1(),
        calcType: action.calcType,
        data: action.data,
      }],
      requestState: _STATE_IDLE,
      requestErrorCode: action.errorCode || null,
    },
  ),
};

// ------------------------------------
// Epics (https://github.com/redux-observable/redux-observable)
// ------------------------------------

export function calcEpic(action$, store) {
  return action$
    .ofType(CALC_REQUEST)
    .mergeMap(action =>
      YqlFacade.makeCalculation(store.getState().location, action.payload),
    )
    .map(data =>
      actions.finishCalcSuccess(action$.calcType, data.response)
    )
    .catch(err =>
      actions.finishCalcError(err)
    );
}

// ------------------------------------
// Selectors
// ------------------------------------


const getLocation = state => state.location;
const getCalcList = state => state.calc.calcList;

// somewhat redundant due to getCalcResult, but makes component cleaner
export const isCalcResult = createSelector(
  [getLocation],
  location => location.search.length > 0,
);

export const getCalcResult = createSelector(
  [getLocation, getCalcList],
  (location, calcList) => (
    location.search
    ? calcList
    .filter(obj => obj.calcId === location.query.calcId)
    .map(ele => ele.data)
    : null
  ),
);

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  calcList: [],
  requestState: _STATE_IDLE,
  requestErrorCode: null,
};

export function calcReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

export default { actions, calcReducer, calcEpic, CALC_REQUEST };
