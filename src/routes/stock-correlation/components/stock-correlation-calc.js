import React, { PropTypes } from 'react';
import Table from 'react-toolbox/lib/table';
import 'styles/twoDimensionDataTable.scss';

export const StockCorrelationCalc = props => (
  <div>
    <div>
    </div>
    <div>
      <Table
        className={'twoDimensionDataTable'}
        model={props.calcResult.symbolModel}
        source={props.calcResult.correlations}
        selectable={false}
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
  }),
};

export default StockCorrelationCalc;
