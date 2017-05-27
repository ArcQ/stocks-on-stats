import React, { PropTypes } from 'react';
import { CalcLayout } from 'shared/layouts';
import content from 'content/risk-of-ruin.json';
import Calc from './risk-of-ruin-calc';
import Input from './risk-of-ruin-input';
import './risk-of-ruin.scss';

export const RiskOfRuin = props => (
  <div>
    <CalcLayout
      {...props}
      title='Risk of Ruin'
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

RiskOfRuin.propTypes = {
  isCalcResult: PropTypes.bool.isRequired,
};

export default RiskOfRuin;
