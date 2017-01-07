import React, { PropTypes } from 'react';
import { Button, section, Input } from 'react-toolbox';
import 'react-tagsinput/react-tagsinput.css';
import './limit-order-success.scss';

// TODO when user goes beyond 1 year on date picker, show dialog alerting user of limitation

export const LimitOrderSuccessInput = props => (
  <div>
    <Input
      type='text'
      label='Stock Symbol'
      name='StockSymbol'
      onChange={props.handleStockSymbolInput}
      value={props.stockSymbol}
    />
    <section>
      <Input
        type='text'
        label='Current Price (USD)'
        name='Current Price'
        onChange={props.handleCurrentPriceInput}
        value={props.prices.current}
      />
      <Input
        type='text'
        label='Limit Price (USD)'
        name='Limit Price'
        onChange={props.handleLimitPriceInput}
        value={props.prices.limit}
      />
    </section>
    <Button
      className='btn btn-default'
      onClick={() => props.makeCalc(props.stockSymbol, props.prices)}
      raised
      primary
    >
      Calculate
    </Button>
  </div>
);

LimitOrderSuccessInput.propTypes = {
  stockSymbol: PropTypes.string.isRequired,
  prices: PropTypes.shape({
    current: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
  }).isRequired,
  handleStockSymbolInput: PropTypes.func.isRequired,
  handleCurrentPriceInput: PropTypes.func.isRequired,
  handleLimitPriceInput: PropTypes.func.isRequired,
  makeCalc: PropTypes.func.isRequired,
};

export default LimitOrderSuccessInput;
