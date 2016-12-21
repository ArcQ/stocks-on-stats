import CoreLayout from '../layouts/CoreLayout/CoreLayout';
import Home from './Home';
import StockCorrelationRoute from './stock-correlation';

export const routes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    StockCorrelationRoute(store),
  ],
});

export default routes;
