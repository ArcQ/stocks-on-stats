import React, { PropTypes } from 'react';

import { CalcLayout } from 'shared/layouts';
import content from 'content/stock-correlation.json';
import Calc from './stock-correlation-calc';
import Input from './stock-correlation-input';
import './stock-correlation.css';

export const StockCorrelation = props => (
  <div>
    <CalcLayout
      {...props}
      title='Correlation Matrix'
      input={Input(props)}
      result={
        (props.isCalcResult)
        ? Calc(props)
        : undefined
      }
      helpData={content.help}
    />
  </div>
);

StockCorrelation.propTypes = {
  isCalcResult: PropTypes.bool.isRequired,
};

export default StockCorrelation;
