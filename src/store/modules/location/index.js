import { browserHistory } from 'react-router';
import { _STATE_REDIRECT, calcReset } from 'store/modules/calc';
// ------------------------------------
// Constants
// ------------------------------------
export const LOCATION_CHANGE = 'LOCATION_CHANGE';

// ------------------------------------
// Actions
// ------------------------------------
export function locationChange(location = '/') {
  return {
    type: LOCATION_CHANGE,
    payload: location,
  };
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const updateLocation = ({ dispatch }) =>
  nextLocation => dispatch(locationChange(nextLocation));

export function redirectToCalcResults(store) {
  return () => {
    const calcList = store.getState().calc.calcList;
    const requestState = store.getState().calc.requestState;
    if (!calcList) return;
    if (requestState === _STATE_REDIRECT) {
      store.dispatch(calcReset());
      browserHistory.push({
        pathname: `${store.getState().location.pathname.split('?')[0]}`,
        query: { calcId: calcList[calcList.length - 1].calcId },
      });
    }
  };
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = browserHistory.getCurrentLocation();

export default function locationReducer(state = initialState, action) {
  return action.type === LOCATION_CHANGE
    ? action.payload
    : state;
}
