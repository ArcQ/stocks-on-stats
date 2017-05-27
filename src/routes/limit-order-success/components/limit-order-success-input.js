import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import StockTagsInput from 'shared/components/stock-tags-input/stock-tags-input';
import { Row, Col } from 'react-flexbox-grid';
import './limit-order-success.css';

// TODO when user goes beyond 1 year on date picker, show dialog alerting user of limitation

function formatIfZero(val) {
  return (val === 0) ? '' : val;
}

export const LimitOrderSuccessInput = props => (
  <div>
    <StockTagsInput
      value={props.taggedStocks}
      onChange={props.handleTagInput}
      placeholder='eg. GOOG;'
      maxOne
    />
    <Row className='price-inputs'>
      <Col xs={6} md={6}>
        <TextField
          type='text'
          floatingLabelText='Current Price (USD)'
          hintText='Current Stock Price'
          onChange={(evt, val) => props.handleCurrentPriceInput(val)}
          value={formatIfZero(props.prices.current)}
        />
      </Col>
      <Col xs={6} md={6}>
        <TextField
          type='text'
          floatingLabelText='Limit Price (USD)'
          hintText='Desired Limit Price'
          onChange={(evt, val) => props.handleLimitPriceInput(val)}
          value={formatIfZero(props.prices.limit)}
        />
      </Col>
    </Row>
    <RaisedButton
      className='btn btn-default'
      onTouchTap={() => props.makeCalc(
        {
          prices: props.prices,
        },
        ...props.taggedStocks,
      )}
      primary
    >
      Calculate
    </RaisedButton>
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
