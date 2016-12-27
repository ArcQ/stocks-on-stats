import React from 'react';
import { browserHistory } from 'react-router';
import Calc from './stock-correlation-calc';
import Input from './stock-correlation-input';

export const StockCorrelation = props => (
  <div style={{ margin: '0 auto' }} >
    { Input(props) }
    { props.isCalcResult && Calc(props) }
  </div>
);

StockCorrelation.propTypes = {
  counter: React.PropTypes.number.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired,
};

export default StockCorrelation;
