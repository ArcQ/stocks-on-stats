import { connect } from 'react-redux';
import { increment, doubleAsync } from '../modules/stock-correlation';

import StockCorrelation from '../components/stock-correlation';

const mapDispatchToProps = {
  increment: () => increment(1),
  doubleAsync,
};

const mapStateToProps = state => ({
  counter: state.stockCorrelation,
});

export default connect(mapStateToProps, mapDispatchToProps)(StockCorrelation);
