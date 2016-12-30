import React from 'react';
import 'react-toolbox/lib/commons.scss'
import Table from 'react-toolbox/lib/table';
import theme from 'styles/twoDimensionDataTable.scss';

// sample matrix: [["g", "stx"], ["g", 1.0, 0.25], ["stx", 0.26, 1.0]]
const StockMatrix = (calcResult) => {
  if(!calcResult) return;
  calcResult.map((ele, i) => {
    if(i==0) return (rowArr) => rowArr.map(ele => <div>{ ele }</div>);
    return (rowArr) => rowArr.map((ele, i) => <div>{ ele }</div>)
  });
  return calcResult;
};

const UserModel = {
  "": {type: String},
  twitter: {type: String},
  birthdate: {type: Date},
  cats: {type: Number},
  dogs: {type: Number},
  active: {type: Boolean}
};

const users = [
  {'': 'Javi Jimenez', twitter: '@soyjavi', birthdate: new Date(1980, 3, 11), cats: 1},
  {'': 'Javi Velasco', twitter: '@javivelasco', birthdate: new Date(1987, 1, 1), dogs: 1, active: true}
];


export const StockCorrelationCalc = props => {
  console.log(props.calcResult);
  if(props.isCalcResult){
    return (
      <div>
        <div>
          <h2> Results </h2>
          { StockMatrix(props.calcResult) }
        </div>
        <div>
          <Table
            theme={theme}
            className={theme.twoDimensionDataTable}
            model={UserModel}
            source={users}
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
