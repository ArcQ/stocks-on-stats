import React, { PropTypes } from 'react';
import {
  Button,
  section,
  DatePicker,
  RadioGroup,
  RadioButton,
  FontIcon,
  Link,
  Tooltip,
} from 'react-toolbox';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { getFormattedTimeSpan } from 'utils';
import './stock-correlation.scss';

const IntervalTitle = ({ theme, ...props }) => {
  return (<div className='intervalLink'>
    <h4>Interval</h4>
    <Link {...props}>
      <div>
        <FontIcon {...props} value='help_outline' />
      </div>
    </Link>
  </div>);
};

const ToolTipIcon = Tooltip(IntervalTitle);

// TODO when user goes beyond 1 year on date picker, show dialog alerting user of limitation

export const StockCorrelationInput = props => (
  <div>
    <TagsInput
      value={props.taggedStocks}
      addKeys={props.keyCodesForAdd}
      onChange={props.handleTagInput}
      inputProps={{
        className: 'react-tagsinput-input',
        placeholder: 'eg. GOOG;AAPL;AMZN;',
      }}
      onlyUnique
    />
    <section>
      <DatePicker
        label='Start Date'
        onChange={props.handleStartDateInput}
        value={props.timeSpan.startDate}
        minDate={props.datePicker.min}
        maxDate={props.datePicker.max}
        sundayFirstDayOfWeek
      />
      <DatePicker
        label='End Date'
        onChange={props.handleEndDateInput}
        value={props.timeSpan.endDate}
        minDate={props.datePicker.min}
        maxDate={props.datePicker.max}
        sundayFirstDayOfWeek
      />
      <ToolTipIcon
        tooltip='The higher this value, the less it will be affected by short term volatility.'
        tooltipPosition='right'
        tooltipHideOnClick={false}
      />
      <RadioGroup name='comic' value={props.interval} onChange={props.handleIntervalInput}>
        <RadioButton label='Daily' value='1' />
        <RadioButton label='Weekly' value='7' />
        <RadioButton label='Monthly' value='30' />
      </RadioGroup>
    </section>
    <Button
      className='btn btn-default'
      onClick={() => props.makeCalc(
        {
          timeSpan: getFormattedTimeSpan(props.timeSpan),
          interval: props.interval,
        },
        ...props.taggedStocks,
      )}
      raised
      primary
    >
      Calculate
    </Button>
  </div>
);

StockCorrelationInput.propTypes = {
  keyCodesForAdd: PropTypes.arrayOf(PropTypes.number),
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
