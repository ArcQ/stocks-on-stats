import { connect } from 'react-redux';
import { calcRequest } from 'store/modules/calc';
import { increment, doubleAsync } from '../modules/stock-correlation';
import { locationChange } from 'store/modules/location';

import StockCorrelation from '../components/stock-correlation';

const mapDispatchToProps = {
  increment: () => increment(1),
  doubleAsync,
  calcRequest,
  locationChange: () => locationChange('/')
};

const mapStateToProps = state => ({
  counter: state.stockCorrelation,
});

export default connect(mapStateToProps, mapDispatchToProps)(StockCorrelation);
