import React from 'react';
import { Layout, Panel } from 'react-toolbox';
import 'styles/core.scss';
import Header from 'components/header';
import Drawer from 'containers/drawer-container';
import './core-layout.scss';

export const CoreLayout = ({ children }) => (
  <div className='core-layout'>
    <Header />
    <Layout>
      <Drawer />
      <Panel>
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
          {children}
        </div>
      </Panel>
    </Layout>
  </div>
);

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default CoreLayout;
