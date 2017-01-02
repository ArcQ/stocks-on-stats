import { locationChange } from 'store/modules/location';
import { connect } from 'react-redux';
import { makeCalc, isCalcResult, getCalcResult } from 'store/modules/calc';
import { increment, doubleAsync } from '../modules/stock-correlation';

import StockCorrelation from '../components/stock-correlation';

const mapDispatchToProps = {
  increment: () => increment(1),
  doubleAsync,
  makeCalc,
  locationChange: () => locationChange('/'),
};

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// sample input structure: {"symbol": ["g", "stx"], "results": [[1.0, 0.25], [0.26, 1.0]]}
/* sample output structure: {
  symbolModel: {"":{type:String}, "g":{type:String}, "stx":{type:String}},
  correlations: [{"":"g", g:1.0, stx:0.25}, ["":"stx", g:0.26, stx:1.0]]
}
*/
function getFormattedData(state) {
  if (!isCalcResult(state)) return null;
  const unformattedData = deepClone(getCalcResult(state))[0];
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

const mapStateToProps = state => ({
  counter: state.stockCorrelation,
  isCalcResult: isCalcResult(state),
  calcResult: getFormattedData(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(StockCorrelation);
