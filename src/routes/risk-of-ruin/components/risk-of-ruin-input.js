import React, { PropTypes } from 'react';
import { Button, section, DatePicker } from 'react-toolbox';
import 'react-tagsinput/react-tagsinput.css';
// import ReduxVariableFormFields from 'components/var-num-fields';
import ReduxVariableFormFields, { VarRow, VarLast } from 'redux-variable-form-fields';
import Input from 'react-toolbox/lib/input';
import './risk-of-ruin.scss';

const { Row, Col } = require('react-flexbox-grid');

// TODO when user goes beyond 1 year on date picker, show dialog alerting user of limitation

export const RiskOfRuinInput = props => (
  <div>
    <h6>Your Portfolio</h6>
    <ReduxVariableFormFields formKey='testForm'>
      <VarRow>
        <Row>
          <Col xs={5} md={5}>
            <Input label='stock' key='stock' varInput type='text' />
          </Col>
          <Col xs={5} md={5}>
            <Input label='amount' key='amount' varInput type='text' />
          </Col>
          <Col xs={1} md={1}>
            <Button varRemove icon='remove' floating accent mini />
          </Col>
        </Row>
      </VarRow>
      <VarLast>
        <Button varAdd icon='add' label='Add Row' flat primary />
      </VarLast>
    </ReduxVariableFormFields>
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
