import React from 'react';
import { connect } from 'react-redux';
import { makeCalc } from 'store/modules/calc/';
import update from 'immutability-helper';

import { selectors } from '../modules/limit-order-success';
import LimitOrderSuccess from '../components/limit-order-success';

const STOCK_SYMBOL_KEY = 'stockSymbol';
const CURRENT_PRICE_KEY = 'current';
const LIMIT_PRICE_KEY = 'limit';

class LimitOrderSuccessContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      stockSymbol: '',
      prices: {
        current: '',
        limit: '',
      },
    };

    this.handleStockSymbolInput = this.transferInputChangeToState.bind(this, STOCK_SYMBOL_KEY);
    this.handleCurrentPriceInput = this.transferInputChangeToState.bind(this, CURRENT_PRICE_KEY);
    this.handleLimitPriceInput = this.transferInputChangeToState.bind(this, LIMIT_PRICE_KEY);
  }
  transferInputChangeToState(key, value) {
    if (key === STOCK_SYMBOL_KEY) {
      this.setState({ [key]: value });
    } else {
      const newPrices = update(this.state.prices, {
        [key]: { $set: value },
      });
      this.setState({ prices: newPrices });
    }
  }
  render() {
    return (
      <div>
        { LimitOrderSuccess({
          ...this.props,
          ...this.state,
          handleStockSymbolInput: this.handleStockSymbolInput,
          handleCurrentPriceInput: this.handleCurrentPriceInput,
          handleLimitPriceInput: this.handleLimitPriceInput,
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

export default connect(mapStateToProps, mapDispatchToProps)(LimitOrderSuccessContainer);
