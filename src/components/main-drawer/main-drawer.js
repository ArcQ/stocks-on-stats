import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Help from 'material-ui/svg-icons/action/help';
import Send from 'material-ui/svg-icons/content/send';
import './main-drawer.scss';
import styles from './main-drawer-styles';

function getCalculatorMenuItems(routesArr, router) {
  const listItems = routesArr;
  const formatCaption = (routeStr) => {
    const routeStrArr = routeStr.split('-');
    return routeStrArr.map(str =>
      str.charAt(0).toUpperCase() + str.slice(1),
    ).join(' ');
  };
  // TODO should change all listItems to link liste items and use to:'#/test'
  return listItems.map(routeStr => (
    <MenuItem
      key={`MenuItem_${routeStr}`}
      onClick={() => router.push({ pathname: `/calculators/${routeStr}` })}
    >
      { formatCaption(routeStr) }
    </MenuItem>));
}

const featArr = [
  'stock-correlation',
  'limit-order-success',
  'risk-of-ruin',
];

const style = {
  divider: {
    marginTop: '10px',
    marginBottom: '10px',
  },
};

function MainDrawer(props) {
  return (
    <Drawer open containerStyle={styles.mainDrawer}>
      { getCalculatorMenuItems(featArr, props.router) }
      <Divider style={style.divider} />
      <MenuItem leftIcon={<Help />}>Help</MenuItem>
      <MenuItem leftIcon={<Send />}>Contact</MenuItem>
    </Drawer>);
}

MainDrawer.propTypes = {
  router: React.PropTypes.shape({}).isRequired,
};

export default MainDrawer;
