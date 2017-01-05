import React from 'react';
import { NavDrawer } from 'react-toolbox';
import { List, ListItem, ListSubHeader, ListDivider } from 'react-toolbox/lib/list';

function Drawer() {
  return (
    <NavDrawer
      active
      pinned
      className='drawer'
    >
      <List selectable ripple>
        <ListSubHeader caption='Explore Calculators' />
        <ListItem
          caption='Stock Correlation'
        />
        <ListDivider />
        <ListItem
          caption='Help'
          legend='Need help using calculators?'
          leftIcon='help'
        />
        <ListItem
          caption='Contact'
          legend='Need More Calculators?'
          leftIcon='send'
        />
      </List>
    </NavDrawer>
  );
}

export default Drawer;
