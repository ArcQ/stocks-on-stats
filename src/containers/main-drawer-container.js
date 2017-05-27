import React from 'react';
import MainDrawer from 'components/main-drawer/main-drawer';
import { withRouter } from 'react-router';

class MainDrawerContainer extends React.Component {
  render() {
    return (
      MainDrawer({ router: this.props.router })
    );
  }
}

MainDrawerContainer.propTypes = {
  router: React.PropTypes.shape({}).isRequired,
};

const DecoratedContainer = withRouter(MainDrawerContainer);

export default DecoratedContainer;

