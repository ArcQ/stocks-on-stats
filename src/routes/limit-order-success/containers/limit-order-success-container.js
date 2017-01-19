import React from 'react';
import { connect } from 'react-redux';
import { makeCalc } from 'store/modules/calc/';
import update from 'immutability-helper';

import { selectors } from '../modules/limit-order-success';
import LimitOrderSuccess from '../components/limit-order-success';

const TAG_INPUT_KEY = 'taggedStocks';
const CURRENT_PRICE_KEY = 'current';
const LIMIT_PRICE_KEY = 'limit';

class LimitOrderSuccessContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      taggedStocks: [],
      prices: {
        current: '',
        limit: '',
      },
    };

    this.handleTagInput = this.handleGenericInput.bind(this, TAG_INPUT_KEY);
    this.handleCurrentPriceInput = this.handleGenericInput.bind(this, CURRENT_PRICE_KEY);
    this.handleLimitPriceInput = this.handleGenericInput.bind(this, LIMIT_PRICE_KEY);
  }
  // TODO seperate genericInput into 2 functions afterall
  handleGenericInput(key, value) {
    if (key === TAG_INPUT_KEY) {
      this.setState({ [key]: value });
    } else {
      const parsedValue = parseInt(value, 10);
      // if parsedValue is not empty string but has a non numerical number
      if (parsedValue && isNaN(parsedValue)) {
        // TODO add error case (what if not number?)
      } else {
        const newPrices = update(this.state.prices, {
          [key]: { $set: parsedValue },
        });
        this.setState({ prices: newPrices });
      }
    }
  }
  render() {
    return (
      <div>
        { LimitOrderSuccess({
          ...this.props,
          ...this.state,
          handleTagInput: this.handleTagInput,
          handleCurrentPriceInput: this.handleCurrentPriceInput,
          handleLimitPriceInput: this.handleLimitPriceInput,
        })
        }
      </div>);
  }
}

// TODO add validation either in calc or realtime

const mapDispatchToProps = {
  makeCalc,
};

const mapStateToProps = state => ({
  isCalcResult: selectors.isCalcResult(state),
  percentageSuccess: selectors.getPercentageSuccess(state),
  percentColor: selectors.getCalcPercentColor(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(LimitOrderSuccessContainer);
