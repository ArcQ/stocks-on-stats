import React from 'react';

// sample matrix: [["g", "stx"], ["g", 1.0, 0.25], ["stx", 0.26, 1.0]]
const StockMatrix = (calcResult) => {
  if(!calcResult) return;
  calcResult.map((ele, i) => {
    if(i==0) return (rowArr) => rowArr.map(ele => <div>{ ele }</div>);
    return (rowArr) => rowArr.map((ele, i) => <div>{ ele }</div>)
  });
  return calcResult;
};

export const StockCorrelationCalc = props => {
  console.log(props.calcResult);
  if(props.isCalcResult){
    return (
      <div>
        <h2> Results </h2>
        { StockMatrix(props.calcResult) }
        { [<div>test1</div>, <div>test2</div>]}
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
