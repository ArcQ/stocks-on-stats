import React, { PropTypes } from 'react';
import 'styles/twoDimensionDataTable.scss';

const percentSuccess = 'percentSuccess';
const limitOrderCalc = 'limitOrderCalc';

export const LimitOrderSuccessCalc = props => (
  <div>
    <p className={limitOrderCalc}>
      <span>&quot;</span>
      Your limit order has a
      <span className={`${percentSuccess} ${props.percentColor}`}>
        {props.percentageSuccess}%
      </span>
      chance of success.
      <span>&quot;</span>
    </p>
  </div>
);

LimitOrderSuccessCalc.propTypes = {
  percentageSuccess: PropTypes.number,
  percentColor: PropTypes.string,
};

export default LimitOrderSuccessCalc;
