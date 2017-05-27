import { selectors as calcSelectors } from 'store/modules/calc';
import { deepClone } from 'utils';
import update from 'immutability-helper';

// ------------------------------------
// Constants
// ------------------------------------
export const TAGS_INPUT_CHANGE = 'TAGS_INPUT_CHANGE';
export const RUIN_PERCENT_CHANGE = 'RUIN_PERCENT_CHANGE';

// ------------------------------------
// Actions
// ------------------------------------
export function setRuinPercent(percent) {
  return {
    type: RUIN_PERCENT_CHANGE,
    payload: percent,
  };
}

export const actions = {
  setRuinPercent,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RUIN_PERCENT_CHANGE]: (state, action) => update(state, {
    ruinPercent: { $set: action.payload },
  }),
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

export function getFormattedData(state) {
  if (!isCalcResult(state)) return null;
  const unformattedData = deepClone(calcSelectors.getCalcResult(state))[0];
  const formattedData = {
    symbolModel: {
      '': { type: String },
    },
  };

  unformattedData.symbol.forEach((ele) => {
    formattedData.symbolModel[ele] = { type: String };
  });

  // before formattedData.correlations = [[1.0, 0.25], [0.26, 1.0]]
  formattedData.correlations = unformattedData.results.slice(0);

  // after formattedData.correlations = [{"":"g", g:1.0, stx:0.25}, ["":"stx", g:0.26, stx:1.0]]
  // corrArr = [1.0,0.3];
  formattedData.correlations = formattedData.correlations.map((corrArr, i) => {
    const newEle = { '': unformattedData.symbol[i] };
    // corr = 1.0;
    corrArr.forEach((corr, j) => {
      newEle[unformattedData.symbol[j]] = (corr < 1) ? `${(corr * 100).toFixed(2)}%` : 1;
    });

    return newEle;
  });

  return formattedData;
}

export function getRuinPercent(state) {
  return state['risk-of-ruin'].ruinPercent;
}

export const selectors = {
  getFormattedData,
  isCalcResult,
  getRuinPercent,
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  ruinPercent: 50,
};
export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
