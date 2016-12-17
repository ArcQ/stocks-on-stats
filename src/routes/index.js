import CoreLayout from '../layouts/CoreLayout/CoreLayout';
import Home from './Home';
import CounterRoute from './Counter';
import StockCorrelationRoute from './stock-correlation';

export const routes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    CounterRoute(store),
    StockCorrelationRoute(store),
  ],
});

export default routes;
