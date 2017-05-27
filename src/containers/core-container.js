import React from 'react';
import 'styles/core.css';
import Header from 'components/header';
import MainDrawer from 'containers/main-drawer-container';

const styles = {
  mainDrawer: {
    paddingTop: '100px',
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '1.8rem',
    paddingLeft: '280px',
    paddingTop: '75px',
  },
};


export const CoreLayout = ({ children }) => (
  <div className='core-container'>
    <Header />
    <MainDrawer style={styles.mainDrawer} />
    {/* <Panel> */}
    <div style={styles.content}>
      {children}
    </div>
    {/* </Panel> */}
  </div>
);

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default CoreLayout;
