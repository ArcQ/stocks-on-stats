import React, { PropTypes } from 'react';

const { Row, Col } = require('react-flexbox-grid');

const renderInputs = function(inputArr) {
  inputArr.forEach((inputState) => {
    
  })
};

export const VarNumFields = props => (
  <div>
    {renderInputs()}
  </div>
);

VarNumFields.propTypes = {
  isCalcResult: PropTypes.bool.isRequired,
};

export default VarNumFields;
