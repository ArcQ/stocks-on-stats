import { connect } from 'react-redux';
import { calcRequest, isCalcResult, getCalcResult } from 'store/modules/calc';
import { increment, doubleAsync } from '../modules/stock-correlation';
import { locationChange } from 'store/modules/location';

import StockCorrelation from '../components/stock-correlation';

const mapDispatchToProps = {
  increment: () => increment(1),
  doubleAsync,
  calcRequest,
  locationChange: () => locationChange('/'),
};

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// sample input structure: {"symbol": ["g", "stx"], "results": [[1.0, 0.25], [0.26, 1.0]]}
// sample output structure: [["g", "stx"], ["g", 1.0, 0.25], ["stx", 0.26, 1.0]]
function getFormattedData(state) {
  if(!isCalcResult(state)) return;
  const unformattedData = deepClone(getCalcResult(state))[0];
  let formattedData = unformattedData.results.splice(0);
  formattedData.map((ele, i) => ele.unshift(unformattedData.symbols[i]))
  formattedData.unshift(unformattedData.symbols);
  return formattedData;
}

const mapStateToProps = state => ({
  counter: state.stockCorrelation,
  isCalcResult: isCalcResult(state),
  calcResult: getFormattedData(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(StockCorrelation);
