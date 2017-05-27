import React, { PropTypes } from 'react';
import { CalcLayout } from 'shared/layouts';
import content from 'content/limit-order-success.json';
import Calc from './limit-order-success-calc';
import Input from './limit-order-success-input';

import './limit-order-success.css';

export const LimitOrderSuccess = props => (
  <div>
    <CalcLayout
      {...props}
      title='Limit Order Success'
      input={Input(props)}
      result={
        (props.isCalcResult)
        ? Calc(props)
        : undefined
      }
      helpData={content.help}
    />
  </div>
);

LimitOrderSuccess.propTypes = {
  isCalcResult: PropTypes.bool.isRequired,
};

export default LimitOrderSuccess;
