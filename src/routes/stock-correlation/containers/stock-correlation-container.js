import React from 'react';
import { connect } from 'react-redux';
import { makeCalc } from 'store/modules/calc/';
import { selectors } from '../modules/stock-correlation';

import StockCorrelation from '../components/stock-correlation';

const TAB_KEY_CODE = 9;
const RETURN_KEY_CODE = 13;
const SEMI_COLON_KEY_CODE = 186;
const keyCodesForAdd = [TAB_KEY_CODE, RETURN_KEY_CODE, SEMI_COLON_KEY_CODE];

function handleTagInput(tags) {
  this.setState({ taggedStocks: tags });
}

class StockCorrelationContainer extends React.Component {
  constructor() {
    super();
    this.state = { taggedStocks: [] };
    this.handleTagInput = handleTagInput.bind(this);
  }
  render() {
    return (
      <div>
        { StockCorrelation({
          ...this.props,
          taggedStocks: this.state.taggedStocks,
          handleTagInput: this.handleTagInput,
          keyCodesForAdd,
        })
        }
      </div>);
  }
}

const mapDispatchToProps = {
  makeCalc,
};


const mapStateToProps = state => ({
  isCalcResult: selectors.isCalcResult(state),
  calcResult: selectors.getFormattedData(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(StockCorrelationContainer);
