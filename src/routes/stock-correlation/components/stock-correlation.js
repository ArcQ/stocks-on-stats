import React from 'react';
import YqlFacade from '../../../store/reducers/yql/yql-facade.js';

export const Counter = props => (
  <div style={{ margin: '0 auto' }} >
    <h2>Counter: {props.counter}</h2>
    <button className='btn btn-default' onClick={props.increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-default' onClick={props.doubleAsync}>
      Double (Async)
    </button>
    <button
      className='btn btn-default'
      onClick={
        () =>
        YqlFacade.getStockCorrelationRx({
          startDate: '2013-01-01',
          endDate: '2013-07-01'
        }, 'g', 'stx')
      }>
      Call
    </button>
    <button className='btn btn-default' onClick={console.log(YqlFacade)}>
      Call
    </button>
  </div>
);

Counter.propTypes = {
  counter: React.PropTypes.number.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired,
};

export default Counter;
