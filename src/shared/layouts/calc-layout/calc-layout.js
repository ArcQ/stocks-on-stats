import React, { PropTypes } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { CalcHelp } from 'shared/components';
import IdleAnimation from 'utils/idle-animation';
import defaults from 'content/defaults.json';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import './calc-layout.css';

require('smoothscroll-polyfill').polyfill();

function scrollToAnchor() {
  const offset = document.querySelector('#calc-result-anchor').offsetTop;
  const fixedPadding = 80;
  setTimeout(() => {
    window.scroll({ top: offset - fixedPadding, left: 0, behavior: 'smooth' });
  }, 300);
}

function getWrappedResult(result) {
  if (!result) return undefined;
  return (<div className='calc-result'>
    { result }
  </div>);
}

class CalcLayout extends React.Component {
  componentDidMount() {
    if (this.props.result) {
      scrollToAnchor();
    }
  }
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <Divider />
        <p>lorem ipsu a dk laj lkasd lafjdskl jal kj</p>
        <Row>
          <Col xs={12} md={7}>
            <Paper className='input-container' zDepth={1}>
              <h3>Input</h3>
              {this.props.input}
            </Paper>
            <div className='calc-result-container'>
              <a id='calc-result-anchor'>
                <h4 className='calc-subtitle'>Results</h4>
              </a>
              {getWrappedResult(this.props.result) || <IdleAnimation />}
            </div>
          </Col>
          <Col xs={12} md={5}>
            <CalcHelp
              sigText={this.props.sigText}
              howItWorksText={this.props.howItWorksText}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
CalcLayout.propTypes = {
  title: PropTypes.string.isRequired,
  input: PropTypes.element.isRequired,
  result: PropTypes.element,
  sigText: PropTypes.string,
  howItWorksText: PropTypes.string,
};

CalcLayout.defaultProps = {
  result: undefined,
  sigText: defaults.sigText,
  howItWorksText: defaults.howItWorksText,
};

export default CalcLayout;
