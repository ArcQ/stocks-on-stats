import React, { PropTypes } from 'react';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import './calc-help.css';

const CalcHelpSubtitle = props => (
  <CardTitle
    className='calc-help-subtitle'
    subtitle={props.subtitle}
  />
);

CalcHelpSubtitle.propTypes = {
  subtitle: PropTypes.string.isRequired,
};

const CalcHelpText = props => (
  <CardText
    className='calc-help-text'
  >
    {props.text}
  </CardText>
);

CalcHelpText.propTypes = {
  text: PropTypes.string.isRequired,
};

const CalcHelp = props => (
  <Card>
    <CardHeader
      avatar='https://placeimg.com/80/80/animals'
      title={<h4>Stocks On Stats Help</h4>}
      className='help-header'
    />
    <CalcHelpSubtitle
      subtitle='What is the significance of this calculator?'
    />
    <CalcHelpText
      text={props.sigText}
    />
    <CalcHelpSubtitle
      subtitle='How does this calculator work?'
    />
    <CalcHelpText
      text={props.howItWorksText}
    />
  </Card>
);

CalcHelp.propTypes = {
  sigText: PropTypes.string.isRequired,
  howItWorksText: PropTypes.string.isRequired,
};


export default CalcHelp;
