import React from 'react';
import { Layout, Panel } from 'react-toolbox';
import Header from '../../components/header';
import Drawer from '../../components/drawer';
import coreLayoutStyle from './core-layout.scss';
import '../../styles/core.scss';

export const CoreLayout = ({ children }) => (
  <div className={coreLayoutStyle['core-layout']}>
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
