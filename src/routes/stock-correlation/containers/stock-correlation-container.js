import { connect } from 'react-redux';
import { makeCalc } from 'store/modules/calc/';
import { selectors } from '../modules/stock-correlation';

import StockCorrelation from '../components/stock-correlation';

const mapDispatchToProps = {
  makeCalc,
};


const mapStateToProps = state => ({
  isCalcResult: selectors.isCalcResult(state),
  calcResult: selectors.getFormattedData(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(StockCorrelation);
