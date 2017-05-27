import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import 'react-tagsinput/react-tagsinput.css';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import VariableFormFields, { VarRows, VarLast } from 'variable-form-fields';

import './risk-of-ruin.css';

const { Row, Col } = require('react-flexbox-grid');

export const RiskOfRuinInput = props => (
  <div>
    <p>Your Portfolio</p>
    <VariableFormFields
      onChange={newFormData => props.onFieldsChange(newFormData)}
      data={props.formData}
    >
      <VarRows name='portfolio-row' transitionLeaveTimeout={200}>
        <Row>
          <Col xs={5} sm={5} md={5}>
            <TextField
              className='var-input'
              varInput
              type='text'
              floatingLabelText='Stock Symbol'
              hintText='eg. GOOG'
            />
          </Col>
          <Col xs={5} sm={5} md={5}>
            <TextField
              className='var-input'
              varInput
              type='text'
              floatingLabelText='Shares of Stock'
              hintText='eg. 50'
            />
          </Col>
          <Col xs={1} sm={5} md={1}>
            <FloatingActionButton className='rm-row-btn' varRemove mini secondary>
              <ContentRemove />
            </FloatingActionButton>
          </Col>
        </Row>
      </VarRows>
      <VarLast>
        <RaisedButton
          className='add-row-btn'
          varAdd
          label='ADD ROW'
          primary
          icon={<ContentAdd />}
        />
      </VarLast>
    </VariableFormFields>
    <Row>
      <p>Ruin (% of Portfolio Worth in Losses)</p>
      <Col xs={10} md={10}>
        <Slider
          defaultValue={0.5}
          onChange={(evt, val) => props.setRuinPercent((val * 100).toFixed(0))}
        />
      </Col>
      <Col xs={2} md={2}>
        { `${props.ruinPercent}%` }
      </Col>
    </Row>
    <RaisedButton
      className='calculate-btn btn btn-default'
      onTouchTap={() => props.makeCalc()}
      primary
    >
      Calculate
    </RaisedButton>
  </div>
);

RiskOfRuinInput.propTypes = {
  makeCalc: PropTypes.func.isRequired,
  formData: PropTypes.shape({}).isRequired,
  onFieldsChange: PropTypes.func.isRequired,
  ruinPercent: PropTypes.number.isRequired,
  setRuinPercent: PropTypes.func.isRequired,
};

export default RiskOfRuinInput;
