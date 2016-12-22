// ------------------------------------
// Constants
// ------------------------------------
export const DATA_REQUEST = 'DATA_REQUEST';

// ------------------------------------
// Epics (https://github.com/redux-observable/redux-observable)
// ------------------------------------

// ------------------------------------
// Actions
// ------------------------------------
export function makeRequest(location = '/') {
  return {
    type: DATA_REQUEST,
    payload: location,
  };
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const doubleAsync = () =>
  (dispatch, getState) =>
    new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type: COUNTER_DOUBLE_ASYNC,
          payload: getState().counter,
        });
        resolve();
      }, 200);
    });

const postYql = () =>
  (dispatch, getState) =>
    new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type: COUNTER_DOUBLE_ASYNC,
          payload: getState().counter,
        });
        resolve();
      }, 200);
    });

export const actions = {
  doubleAsync,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]: (state, action) => state + action.payload,
  [COUNTER_DOUBLE_ASYNC]: state => state * 2,
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null;
export default function locationReducer(state = initialState, action) {
  return action.type === DATA_REQUEST
    ? action.payload
    : state;
}
