import React from 'react';
import { browserHistory } from 'react-router';

export const StockCorrelationCalc = props => {
  console.log(props.calcResult);
  if(props.isCalcResult){
    return (
      <div>
        <h2> Results </h2>
        { props.calcResult }
        { [<div>test1</div>, <div>test2</div>]}
      </div>);
  }
  return null;
};

StockCorrelationCalc.propTypes = {
  counter: React.PropTypes.number.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired,
};

export default StockCorrelationCalc;
