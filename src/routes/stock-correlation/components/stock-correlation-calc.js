import React from 'react';
import Table from 'react-toolbox/lib/table';
import theme from 'styles/twoDimensionDataTable.scss';

export const StockCorrelationCalc = props => {
  console.log(props.calcResult);
  if(props.isCalcResult){
    return (
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
}
return null;
};

StockCorrelationCalc.propTypes = {
  counter: React.PropTypes.number.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired,
};

export default StockCorrelationCalc;
