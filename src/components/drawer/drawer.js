import React from 'react';
import { NavDrawer} from 'react-toolbox';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import style from './drawer.scss';

function Drawer() {
  return (
    <NavDrawer
      active= { true }
      pinned= { true }
      className = {style.drawer}>
      <List selectable ripple>
        <ListSubHeader caption='Explore Calculators' />
        <ListItem
          caption='Correlation'
        />
        <ListDivider />
        <ListItem
          caption='Help'
          legend='Need help using calculators?'
          leftIcon='help' />
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
