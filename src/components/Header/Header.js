import React from 'react';
import { IndexLink, Link } from 'react-router';
import { AppBar, Navigation } from 'react-toolbox';
import './header.scss';

export const Header = () => (
  <AppBar
    title="StocksOnStats"
    leftIcon="menu">
    <Navigation type="horizontal">
      <IndexLink to='/' activeClassName='route--active'>
        Browse
      </IndexLink>
      {' · '}
      <Link to='/stock-correlation' activeClassName='route--active'>
        Stock Correlation
      </Link>
    </Navigation>
  </AppBar>
);

export default Header;
