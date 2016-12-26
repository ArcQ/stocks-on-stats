import YqlFacade from './utils/yql/yql-facade';
var uuid = require('node-uuid');
// ------------------------------------
// Constants
// ------------------------------------
const _STATE_IDLE = 0;
const _STATE_PROCESSING = 1;

export const CALC_REQUEST = 'CALC_REQUEST';
export const NOTIFY_REQUEST_FINISH = 'NOTIFY_REQUEST_FINISH';
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
    type: NOTIFY_REQUEST_FINISH,
    payload: err,
  };
}

export function notifyRequestFinish(location = '/') {
  return {
    type: NOTIFY_REQUEST_FINISH,
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
  [CALC_REQUEST]: (state, action) => _STATE_PROCESSING,
  [NOTIFY_REQUEST_FINISH]: (state, action) => Object.assign(
    {},
    state,
    {
      calcId: uuid.v1(),
      calcType: action.calcType,
      data: action.data,
    }),
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
      type: NOTIFY_REQUEST_FINISH,
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
const initialState = _STATE_IDLE;

export function calcReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

export default { actions, calcReducer, calcEpic, CALC_REQUEST };
