import React, { PropTypes } from 'react';
import TagsInput from 'react-tagsinput';
import { keyCodesForAdd } from 'utils';
import 'react-tagsinput/react-tagsinput.css';
import './stock-tags-input.css';

const StockTagsInput = (props) => {
  const { placeholder, maxOne, ...restProps } = props;
  return (
    <TagsInput
      {...restProps}
      addKeys={keyCodesForAdd}
      inputProps={{
        className: 'react-tagsinput-input',
        placeholder,
      }}
      onlyUnique
      maxTags={(maxOne) ? 1 : -1}
    />
  );
};

StockTagsInput.propTypes = {
  taggedStocks: PropTypes.arrayOf(
    PropTypes.string,
  ),
  handleTagInput: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  maxOne: PropTypes.bool,
};

StockTagsInput.defaultProps = {
  taggedStocks: [],
  maxOne: false,
  handleTagInput: () => {},
};


export default StockTagsInput;
