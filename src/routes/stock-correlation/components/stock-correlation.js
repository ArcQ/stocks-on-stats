import React from 'react';
import { browserHistory } from 'react-router';

export const StockCorrelation = props => (
  <div style={{ margin: '0 auto' }} >
    <h2>Counter: {props.counter}</h2>
    <button className='btn btn-default' onClick={props.increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-default' onClick={props.doubleAsync}>
      Double (Async)
    </button>
    <button className='btn btn-default' onClick={() => browserHistory.push('/stock-correlation?cid=1234')}>
      GoTo Test
    </button>
    <button
      className='btn btn-default'
      onClick={
        () =>
        props.calcRequest({
          startDate: '2013-01-01',
          endDate: '2013-07-01'
        }, 'g', 'stx')
      }>
      Call
    </button>
  </div>
);

StockCorrelation.propTypes = {
  counter: React.PropTypes.number.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired,
};

export default StockCorrelation;
