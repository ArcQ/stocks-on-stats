import { selectors as calcSelectors } from 'store/modules/calc';

// ------------------------------------
// Constants
// ------------------------------------
export const TAGS_INPUT_CHANGE = 'TAGS_INPUT_CHANGE';

// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
};

// ------------------------------------
// Selectors
// ------------------------------------

// sample input structure: {"symbol": ["g", "stx"], "results": [[1.0, 0.25], [0.26, 1.0]]}
/* sample output structure: {
  symbolModel: {"":{type:String}, "g":{type:String}, "stx":{type:String}},
  correlations: [{"":"g", g:1.0, stx:0.25}, ["":"stx", g:0.26, stx:1.0]]
}
*/

export const isCalcResult = calcSelectors.isCalcResult;

export const getPercentageSuccess = function (state) {
  return (calcSelectors.getCalcResult(state) * 100).toFixed(0);
};

function getCalcPercentColor(state) {
  const percentageSuccess = parseInt(getPercentageSuccess(state), 10);
  if (percentageSuccess > 80) {
    return 'colorGood';
  } else if (percentageSuccess > 50) {
    return 'colorMed';
  }
  return 'colorBad';
}

export const selectors = {
  getPercentageSuccess,
  getCalcPercentColor,
  isCalcResult,
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
};
export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
