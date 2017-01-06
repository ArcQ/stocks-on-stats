import React, { PropTypes } from 'react';
import Calc from './limit-order-success-calc';
import Input from './limit-order-success-input';
import {Card, CardTitle, CardMedia, CardText, CardActions, Button} from 'react-toolbox';
import './limit-order-success.scss'
import IdleSvg from './infinity.svg';

const {Grid, Row, Col} = require('react-flexbox-grid');

const IdleAnimation = () => (
      <center className={'idleAnimation'}>
        <IdleSvg />
        <p>Idle: Awaiting Input</p>
      </center>
);

export const LimitOrderSuccess = props => (
  <div>
    <h2>Correlation Matrix</h2>
    <Row className='calcRow' >
      <Col xs={12} md={7}>
        <h4 className='calcSubtitle'>Input</h4>
        { Input(props) }
        <h4 className='calcSubtitle'>Results</h4>
        { (!props.isCalcResult) && <IdleAnimation /> }
        { (props.isCalcResult) && Calc(props) }
      </Col>
      <Col xs={12} md={5}>
        <Card style={{width: '100%'}}>
          <CardTitle
            avatar="https://placeimg.com/80/80/animals"
            title="Stocks On Stats Help"
          />
          <CardTitle
            subtitle="What is the significance of this calculator?"
          />
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </CardText>
          <CardTitle
            subtitle="How does this calculator work?"
          />
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </CardText>
        </Card>
        <p>  </p>
      </Col>
    </Row>
  </div>
);

LimitOrderSuccess.propTypes = {
  isCalcResult: PropTypes.bool.isRequired,
};

export default LimitOrderSuccess;
