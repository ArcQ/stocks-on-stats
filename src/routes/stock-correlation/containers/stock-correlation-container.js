import React from 'react';
import { connect } from 'react-redux';
import { makeCalc } from 'store/modules/calc/';
import update from 'immutability-helper';

import { selectors } from '../modules/stock-correlation';

import StockCorrelation from '../components/stock-correlation';

const TAB_KEY_CODE = 9;
const RETURN_KEY_CODE = 13;
const SEMI_COLON_KEY_CODE = 186;
const START_DATE_KEY = 'startDate';
const END_DATE_KEY = 'endDate';

const keyCodesForAdd = [TAB_KEY_CODE, RETURN_KEY_CODE, SEMI_COLON_KEY_CODE];

// takes variable arguments: 1(date) or 3(year,month,day)
function getFormattedDateStr(...args) {
  const concatDateStr = (year, month, day) => `${year}-${month}-${day}`;
  return (args.length > 1)
    ? concatDateStr(...args)
    : concatDateStr(args[0].getFullYear(), args[0].getMonth(), args[0].getDate());
}

function getDateBackByMonths(month = 0) {
  const dt = new Date();
  return new Date(dt.setMonth(dt.getMonth() - month));
}


class StockCorrelationContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      taggedStocks: [],
      interval: {
        startDate: getDateBackByMonths(1),
        endDate: getDateBackByMonths(),
        min: getDateBackByMonths(12),
        max: getDateBackByMonths(),
      },
    };
    this.handleTagInput = this.handleTagInput.bind(this);
    this.handleStartDateInput = this.handleDateInput.bind(this, START_DATE_KEY);
    this.handleEndDateInput = this.handleDateInput.bind(this, END_DATE_KEY);
    this.makeStockCorrelationCalc = this.makeStockCorrelationCalc.bind(this);
  }
  handleDateInput(key, date) {
    const newInterval = update(this.state.interval, {
      [key]: { $set: date },
    });
    this.setState({ interval: newInterval });
  }
  handleTagInput(tags) {
    this.setState({ taggedStocks: tags });
  }
  makeStockCorrelationCalc() {
    const formattedInterval = update(this.state.interval, {
      [START_DATE_KEY]: { $apply: date => getFormattedDateStr(date) },
      [END_DATE_KEY]: { $apply: date => getFormattedDateStr(date) },
    });
    makeCalc(formattedInterval, ...this.state.taggedStocks);
  }
  render() {
    return (
      <div>
        { StockCorrelation({
          ...this.props,
          ...this.state,
          handleTagInput: this.handleTagInput,
          handleStartDateInput: this.handleStartDateInput,
          handleEndDateInput: this.handleEndDateInput,
          makeStockCorrelationCalc: this.makeStockCorrelationCalc,
          keyCodesForAdd,
        })
        }
      </div>);
  }
}

const mapDispatchToProps = {
};

const mapStateToProps = state => ({
  isCalcResult: selectors.isCalcResult(state),
  calcResult: selectors.getFormattedData(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(StockCorrelationContainer);
