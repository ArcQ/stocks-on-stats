import React from 'react';
import Drawer from 'components/drawer/drawer';
import { withRouter } from 'react-router';

class DrawerContainer extends React.Component {
  render() {
    return (
      Drawer({ router: this.props.router })
    );
  }
}

DrawerContainer.propTypes = {
  router: React.PropTypes.shape({}).isRequired,
};

const DecoratedDrawerContainer = withRouter(DrawerContainer);

export default DecoratedDrawerContainer;

