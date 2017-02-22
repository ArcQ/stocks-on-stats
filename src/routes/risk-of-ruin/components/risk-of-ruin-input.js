import React, { PropTypes } from 'react';
import { Button, section, DatePicker } from 'react-toolbox';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
// import VarNumFields from 'components/var-num-fields';
import VarNumFields from 'redux-variable-number-fields';
import Input from 'react-toolbox/lib/input';
import './risk-of-ruin.scss';

const { Row, Col } = require('react-flexbox-grid');

// TODO when user goes beyond 1 year on date picker, show dialog alerting user of limitation

export const RiskOfRuinInput = props => (
  <div>
    <VarNumFields formKey='testForm'>
      <Row>
        <Col xs={6} md={6}>
          <Input label='stock' key='stock' varNumField type='text' />
        </Col>
        <Col xs={6} md={6}>
          <Input label='amount' key='amount' varNumField type='text' />
        </Col>
      </Row>
      <div></div>
    </VarNumFields>
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
        value={props.interval.startDate}
        minDate={props.interval.min}
        maxDate={props.interval.max}
        sundayFirstDayOfWeek
      />
      <DatePicker
        label='End Date'
        onChange={props.handleEndDateInput}
        value={props.interval.endDate}
        minDate={props.interval.min}
        maxDate={props.interval.max}
        sundayFirstDayOfWeek
      />
    </section>
    <Button
      className='btn btn-default'
      onClick={() => props.makeCalc(props.getFormattedInterval(), ...props.taggedStocks)}
      raised
      primary
    >
      Calculate
    </Button>
  </div>
  );

  RiskOfRuinInput.propTypes = {
    keyCodesForAdd: PropTypes.arrayOf(PropTypes.number),
    taggedStocks: PropTypes.arrayOf(PropTypes.string).isRequired,
    interval: PropTypes.shape({
      startDate: PropTypes.instanceOf(Date).isRequired,
      endDate: PropTypes.instanceOf(Date).isRequired,
      min: PropTypes.instanceOf(Date).isRequired,
      max: PropTypes.instanceOf(Date).isRequired,
    }).isRequired,
    handleStartDateInput: PropTypes.func.isRequired,
    handleEndDateInput: PropTypes.func.isRequired,
    handleTagInput: PropTypes.func.isRequired,
    makeCalc: PropTypes.func.isRequired,
    getFormattedInterval: PropTypes.func.isRequired,
  };

  export default RiskOfRuinInput;
