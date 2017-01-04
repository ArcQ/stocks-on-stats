import React from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import './stock-correlation.scss';

export const StockCorrelationInput = props => (
  <div>
    <h2>Stock Correlation</h2>
    <button
      className='btn btn-default'
      onClick={
        () =>
          props.makeCalc({
            startDate: '2013-01-01',
            endDate: '2013-07-01',
          }, 'g', 'stx')
      }
    >
      Call
    </button>
    <TagsInput 
      value={props.taggedStocks}
      addKeys={props.keyCodesForAdd}
      onChange={props.handleTagInput}
      onlyUnique={true}
      inputProps={{
        className: 'react-tagsinput-input',
        placeholder: 'eg. GOOG;AAPL;AMZN;',
      }}
    />
  </div>
);

StockCorrelationInput.propTypes = {
  // eslint rule error with stateless components awaiting fix
  // eslint-disable-next-line react/no-unused-prop-types
  makeCalc: React.PropTypes.func.isRequired,
};

export default StockCorrelationInput;
