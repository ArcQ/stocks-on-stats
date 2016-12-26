import YqlFacade from './utils/yql/yql-facade';
import { browserHistory } from 'react-router';

var uuid = require('node-uuid');
// ------------------------------------
// Constants
// ------------------------------------
const _STATE_IDLE = 0;
const _STATE_PROCESSING = 1;
const _STATE_ERROR = 2;

export const CALC_REQUEST = 'CALC_REQUEST';
export const NOTIFY_CALC_FINISH = 'NOTIFY_REQUEST_FINISH';
export const CALC_REQUEST_ERR = 'CALC_REQUEST_ERR';

// ------------------------------------
// Actions
// ------------------------------------
export function calcRequest(...args) {
  return {
    type: CALC_REQUEST,
    payload: args,
  };
}

export function requestError(err = 'an error occurred') {
  return {
    type: NOTIFY_CALC_FINISH,
    payload: err,
  };
}
// TODO add error scenario
export function notifyRequestFinish(location = '/') {
  return {
    type: NOTIFY_CALC_FINISH,
    response: location,
  };
}

export const actions = {
  calcRequest,
  notifyRequestFinish,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CALC_REQUEST]: (state) => Object.assign(
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
    .mergeMap((action) => {
      console.log('flatmap');
      return YqlFacade.makeCalculation(store.getState().location, action.payload);
    },
    )
    .map(data => ({
      type: NOTIFY_CALC_FINISH,
      calcType: action$.calcType,
      data,
    }),
    )
    .catch(err => (
      { type: CALC_REQUEST_ERR, err }),
    );
}

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
