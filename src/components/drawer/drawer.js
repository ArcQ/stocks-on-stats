import React from 'react';
import { NavDrawer, Navigation } from 'react-toolbox';
import { List, ListItem, ListSubHeader, ListDivider } from 'react-toolbox/lib/list';
import './drawer.scss';

function getNavListItems(routesArr, router) {
  const listItems = routesArr;
  const formatCaption = (routeStr) => {
    const routeStrArr = routeStr.split('-');
    return routeStrArr.map(str =>
      str.charAt(0).toUpperCase() + str.slice(1),
    ).join(' ');
  };
  return listItems.map((routeStr, i) => (
    <ListItem
      key={i}
      onClick={() => router.push(routeStr)}
      caption={formatCaption(routeStr)}
    />
  ));
}

const tempArr = [
  'stock-correlation',
  'limit-order-success',
];

function Drawer(props) {
  return (
    <NavDrawer
      className='drawer'
      scrollY
      permanentAt='sm'
    >
      <Navigation type='vertical'>
        <List selectable ripple>
          <ListSubHeader caption='Explore Calculators' />
          { getNavListItems(tempArr, props.router) }
          <ListDivider />
          <ListItem
            caption='Help'
            legend='Need Some help on our tools?'
            leftIcon='help'
          />
          <ListItem
            caption='Contact'
            legend='Need More Calculators?'
            leftIcon='send'
          />
        </List>
      </Navigation>
    </NavDrawer>
  );
}

Drawer.propTypes = {
  router: React.PropTypes.shape({}).isRequired,
};

export default Drawer;
