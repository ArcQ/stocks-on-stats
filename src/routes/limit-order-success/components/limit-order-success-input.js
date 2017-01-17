import React, { PropTypes } from 'react';
import { Button, section, Input } from 'react-toolbox';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import './limit-order-success.scss';
import { keyCodesForAdd } from 'utils'

// TODO when user goes beyond 1 year on date picker, show dialog alerting user of limitation

export const LimitOrderSuccessInput = props => (
  <div>
    <TagsInput
      value={props.taggedStocks}
      addKeys={keyCodesForAdd}
      onChange={props.handleTagInput}
      inputProps={{
        className: 'react-tagsinput-input',
        placeholder: 'eg. GOOG;AAPL;AMZN;',
      }}
      onlyUnique
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
      onClick={() => props.makeCalc(
        {
          prices: props.prices,
        },
        ...props.taggedStocks,
      )}
      raised
      primary
    >
      Calculate
    </Button>
  </div>
);

LimitOrderSuccessInput.propTypes = {
  taggedStocks: PropTypes.string.isRequired,
  prices: PropTypes.shape({
    current: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
  }).isRequired,
  handleTagInput: PropTypes.func.isRequired,
  handleCurrentPriceInput: PropTypes.func.isRequired,
  handleLimitPriceInput: PropTypes.func.isRequired,
  makeCalc: PropTypes.func.isRequired,
};

export default LimitOrderSuccessInput;
