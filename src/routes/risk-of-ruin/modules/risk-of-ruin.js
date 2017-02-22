import { selectors as calcSelectors } from 'store/modules/calc';
import { deepClone } from 'utils';

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

export const selectors = {
  getFormattedData,
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
