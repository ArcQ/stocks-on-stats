import React from 'react';
import { IndexLink, Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import './header.css';
import logo from './logo.svg';


// iconElementLeft={<span/>}

const BrandHeader = () => (
  <div className='brand-header'>
    <img src={logo} className='logo' />
    <span> StocksOnStats </span>
  </div>
);

export const Header = () => (
  <AppBar
    className='app-bar'
    title={<BrandHeader />}
    onLeftIconButtonTouchTap={evt => console.log('hey')}
  >
    {/* <Navigation type='horizontal'> */}
    {/*   <IndexLink to='/' activeClassName='routeActive'> */}
    {/*     Browse */}
    {/*   </IndexLink> */}
    {/* </Navigation> */}
  </AppBar>
);

export default Header;
