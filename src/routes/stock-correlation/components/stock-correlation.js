import React, { PropTypes } from 'react';
import Calc from './stock-correlation-calc';
import Input from './stock-correlation-input';

export const StockCorrelation = props => (
  <div style={{ margin: '0 auto' }} >
    { Input(props) }
    { props.isCalcResult && Calc(props) }
  </div>
);

StockCorrelation.propTypes = {
  isCalcResult: PropTypes.bool.isRequired,
};

export default StockCorrelation;
