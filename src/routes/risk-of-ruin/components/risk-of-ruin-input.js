import React, { PropTypes } from 'react';
import { Button, section, DatePicker, Slider } from 'react-toolbox';
import 'react-tagsinput/react-tagsinput.css';
import VariableFormFields, { VarRows, VarLast } from 'variable-form-fields';
import Input from 'react-toolbox/lib/input';
import './risk-of-ruin.scss';

const { Row, Col } = require('react-flexbox-grid');

export const RiskOfRuinInput = props => (
  <div>
    <h6>Your Portfolio</h6>
    <VariableFormFields
      onChange={newFormData => props.onFieldsChange(newFormData)}
      data={props.formData}
    >
      <VarRows name='portfolio-row' transitionLeaveTimeout={200}>
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
      </VarRows>
      <VarLast>
        <Button varAdd icon='add' label='Add Row' flat primary />
      </VarLast>
    </VariableFormFields>
    <section>
      <p>Ruin (% of Portfolio Worth in Losses)</p>
      <Slider
        min={0}
        max={10}
        editable
        value={props.ruinPercentage}
        onChange={(evt) => props.setRuinPercent(evt)}
      />
    </section>
    <Button
      className='btn btn-default'
      onClick={() => props.makeCalc()}
      raised
      primary
    >
      Calculate
    </Button>
  </div>
);

RiskOfRuinInput.propTypes = {
  makeCalc: PropTypes.func.isRequired,
  formData: PropTypes.shape({}).isRequired,
  onFieldsChange: PropTypes.func.isRequired,
  ruinPercentage: PropTypes.number.isRequired,
  setRuinPercent: PropTypes.func.isRequired,
};

export default RiskOfRuinInput;
