import React from 'react';
import { connect } from 'react-redux';
import { makeCalc } from 'store/modules/calc/';
import update from 'immutability-helper';
import {
  START_DATE_KEY,
  END_DATE_KEY,
  getDateBackByMonths,
  getDefaultTimeSpan,
} from 'utils';

import { selectors } from '../modules/stock-correlation';

import StockCorrelation from '../components/stock-correlation';

const INTERVAL_INPUT_KEY = 'interval';
const TAG_INPUT_KEY = 'taggedStocks';


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
    this.handleTagInput = this.handleGenericInput.bind(this, TAG_INPUT_KEY);
    this.handleIntervalInput = this.handleGenericInput.bind(this, INTERVAL_INPUT_KEY);
    this.handleStartDateInput = this.handleDateInput.bind(this, START_DATE_KEY);
    this.handleEndDateInput = this.handleDateInput.bind(this, END_DATE_KEY);
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
          handleTagInput: this.handleTagInput,
          handleIntervalInput: this.handleIntervalInput,
          handleStartDateInput: this.handleStartDateInput,
          handleEndDateInput: this.handleEndDateInput,
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
