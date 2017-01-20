import React from 'react';
import update from 'immutability-helper';
import VarNumFields from '../components/var-num-fields';

const inputKeysArr = [];

export default class VarNumFieldsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taggedStocks: [],
      prices: {
        current: '',
        limit: '',
      },
    };

    React.Children.forEach(this.props.children, childInput => inputKeysArr.push(childInput.props.name));
    console.log(inputKeysArr);
  }
  // TODO seperate genericInput into 2 functions afterall
  handleGenericInput(key, value) {
    if (key === TAG_INPUT_KEY) {
      this.setState({ [key]: value });
    } else {
      const parsedValue = parseInt(value, 10);
      // if parsedValue is not empty string but has a non numerical number
      if (parsedValue && isNaN(parsedValue)) {
        // TODO add error case (what if not number?)
      } else {
        const newPrices = update(this.state.prices, {
          [key]: { $set: parsedValue },
        });
        this.setState({ prices: newPrices });
      }
    }
  }
  render() {
    return (
      <div>
        { VarNumFields({
          ...this.props,
          ...this.state,
        })
        }
      </div>);
  }
}
