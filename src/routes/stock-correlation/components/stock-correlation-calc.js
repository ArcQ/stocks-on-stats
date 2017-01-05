import React, { PropTypes } from 'react';
import Table from 'react-toolbox/lib/table';
import theme from 'styles/twoDimensionDataTable.scss';

export const StockCorrelationCalc = props => (
  <div>
    <div>
      <h2> Results </h2>
    </div>
    <div>
      <Table
        theme={theme}
        className={theme.twoDimensionDataTable}
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
