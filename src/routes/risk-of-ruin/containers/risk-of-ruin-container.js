import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { makeCalc } from 'store/modules/calc/';
import {
  actions as formActions,
  selectors as formSelectors,
} from 'store/modules/variable-form-fields';
import { selectors, actions } from '../modules/risk-of-ruin';
import RiskOfRuin from '../components/risk-of-ruin';

class RiskOfRuinContainer extends React.Component {
  constructor() {
    super();
    this.formKey = 'VariableFormFields';
  }
  render() {
    return (
      <div>
        { RiskOfRuin({
          ...this.props,
          ...this.state,
          makeRiskOfRuinCalc: this.makeRiskOfRuinCalc,
          formKey: this.formKey,
          onFieldsChange: this.props.modifyVarFields,
        })
        }
      </div>);
  }
}

const mapDispatchToProps = {
  makeCalc,
  modifyVarFields: formActions.modifyVarFields,
  setRuinPercent: actions.setRuinPercent,
};

const mapStateToProps = state => ({
  formData: formSelectors.getFormData(state),
  ruinPercent: selectors.getRuinPercent(state),
  isCalcResult: selectors.isCalcResult(state),
  calcResult: selectors.getFormattedData(state),
});

RiskOfRuinContainer.propTypes = {
  modifyVarFields: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RiskOfRuinContainer);
