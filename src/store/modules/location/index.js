import { browserHistory } from 'react-router';
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

let prevCalcListLength = 0;

export function redirectToCalcResults(store) {
  return () => {
    const calcList = store.getState().calc.calcList;
    if (!calcList) return;
    if (calcList.length > prevCalcListLength) {
      prevCalcListLength = calcList.length;
      browserHistory.push({
        pathname: store.getState().location.pathname.split('?')[0],
        query: { calcId: calcList[calcList.length - 1].calcId },
      });
    }
    prevCalcListLength = calcList.length;
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
