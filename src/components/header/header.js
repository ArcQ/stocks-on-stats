import React from 'react';
import { IndexLink, Link } from 'react-router';
import { AppBar, Navigation } from 'react-toolbox';
import './header.scss';
import Logo from './logo.svg';

export const Header = () => (
  <AppBar
    className={'mainAppBar'}
    title='StocksOnStats'
    leftIcon={<Logo className='logo' />}
  >
    <Navigation type='horizontal'>
      <IndexLink to='/' activeClassName='routeActive'>
        Browse
      </IndexLink>
    </Navigation>
  </AppBar>
);

export default Header;
