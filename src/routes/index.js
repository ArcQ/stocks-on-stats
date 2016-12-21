import CoreLayout from '../layouts/core-layout/core-layout';
import Home from './home';
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
