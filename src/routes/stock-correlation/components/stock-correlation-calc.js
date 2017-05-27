import React, { PropTypes } from 'react';
import 'styles/twoDimensionDataTable.scss';
import CalcTable from './calc-table';

export const StockCorrelationCalc = props => (
  <div>
    <div
      className='two-dimension-data-table'
    >
      <CalcTable
        data={props.calcResult.correlations}
        model={props.calcResult.symbolModel}
      />
    </div>
  </div>
);

StockCorrelationCalc.propTypes = {
  calcResult: PropTypes.shape({
    symbolModel: PropTypes.shape({}),
    correlations: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
  }).isRequired,
};

export default StockCorrelationCalc;
