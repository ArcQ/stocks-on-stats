import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import IconButton from 'material-ui/IconButton';
import HelpOutline from 'material-ui/svg-icons/action/help-outline';

import { Row, Col } from 'react-flexbox-grid';
import StockTagsInput from 'shared/components/stock-tags-input/stock-tags-input';
import './stock-correlation.scss';

// TODO when user goes beyond 1 year on date picker, show dialog alerting user of limitation

export const StockCorrelationInput = props => (
  <div>
    <StockTagsInput
      value={props.taggedStocks}
      onChange={props.handleTagInput}
      placeholder='eg. GOOG;AAPL;AMZN;'
    />
    <Row className='date-inputs'>
      <Col xs={6} md={6}>
        <DatePicker
          className='date-input'
          hintText=''
          floatingLabelText='Start Date'
          minDate={props.datePicker.min}
          maxDate={props.datePicker.max}
          onChange={(evt, date) => props.handleStartDateInput(date)}
        />
      </Col>
      <Col xs={6} md={6}>
        <DatePicker
          hintText=''
          floatingLabelText='End Date'
          minDate={props.datePicker.min}
          maxDate={props.datePicker.max}
          onChange={(evt, date) => props.handleEndDateInput(date)}
        />
      </Col>
    </Row>
    <div className='frequency-inputs'>
      <h4> Calculation Frequency
        <IconButton
          tooltip='The higher this value, the less it will be affected by short term volatility.'
          tooltipPosition='top-right'
        >
          <HelpOutline
            className='frequency-tool-tip'
          />
        </IconButton>
      </h4>
      <RadioButtonGroup
        name='correlationGroup'
        value={props.interval}
        onChange={(evt, val) => props.handleIntervalInput(val)}
      >
        <RadioButton label='Daily' value='1' />
        <RadioButton label='Weekly' value='7' />
        <RadioButton label='Monthly' value='30' />
      </RadioButtonGroup>
    </div>
    <RaisedButton
      className='btn btn-default'
      onTouchTap={() => props.makeCalc(
        {
          timeSpan: props.timeSpan,
          interval: props.interval,
        },
        ...props.taggedStocks,
      )}
      primary
    >
      Calculate
    </RaisedButton>
  </div>
);

StockCorrelationInput.propTypes = {
  taggedStocks: PropTypes.arrayOf(PropTypes.string).isRequired,
  datePicker: PropTypes.shape({
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  timeSpan: PropTypes.shape({
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  interval: PropTypes.number.isRequired,
  handleStartDateInput: PropTypes.func.isRequired,
  handleEndDateInput: PropTypes.func.isRequired,
  handleTagInput: PropTypes.func.isRequired,
  handleIntervalInput: PropTypes.func.isRequired,
  makeCalc: PropTypes.func.isRequired,
};

export default StockCorrelationInput;
