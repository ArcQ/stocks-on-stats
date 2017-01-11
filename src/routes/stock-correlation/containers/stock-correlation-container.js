import React from 'react';
import { connect } from 'react-redux';
import { makeCalc } from 'store/modules/calc/';
import update from 'immutability-helper';
import {
  START_DATE_KEY,
  END_DATE_KEY,
  getDateBackByMonths,
  getFormattedDateStr,
  getDefaultTimeSpan,
} from 'utils';

import { selectors } from '../modules/stock-correlation';

import StockCorrelation from '../components/stock-correlation';

const TAB_KEY_CODE = 9;
const RETURN_KEY_CODE = 13;
const SEMI_COLON_KEY_CODE = 186;
const INTERVAL_INPUT_KEY = 'interval';
const TAG_INPUT_KEY = 'taggedStocks';

const keyCodesForAdd = [TAB_KEY_CODE, RETURN_KEY_CODE, SEMI_COLON_KEY_CODE];

class StockCorrelationContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      taggedStocks: [],
      timeSpan: getDefaultTimeSpan(),
      datePicker: {
        min: getDateBackByMonths(12),
        max: getDateBackByMonths(),
      },
      interval: '1',
    };
  }
  handleDateInput(key, date) {
    const newTimespan = update(this.state.timeSpan, {
      [key]: { $set: date },
    });
    this.setState({ timeSpan: newTimespan });
  }
  handleGenericInput(key, value) {
    this.setState({ [key]: value });
  }
  render() {
    return (
      <div>
        { StockCorrelation({
          ...this.props,
          ...this.state,
          keyCodesForAdd,
          handleTagInput: this.handleGenericInput.bind(this, TAG_INPUT_KEY),
          handleIntervalInput: this.handleGenericInput.bind(this, INTERVAL_INPUT_KEY),
          handleStartDateInput: this.handleDateInput.bind(this, START_DATE_KEY),
          handleEndDateInput: this.handleDateInput.bind(this, END_DATE_KEY),
          makeStockCorrelationCalc: this.makeStockCorrelationCalc,
        })}
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
