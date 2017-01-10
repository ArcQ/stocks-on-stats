import CoreLayout from '../layouts/core-layout/core-layout';
import HomeLayout from '../layouts/home-layout/home-layout';
import Home from './home';
import StockCorrelationRoute from './stock-correlation';

export const routes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    StockCorrelationRoute(store),
    coreRoutes(store),
  ],
});

export const coreRoutes = store => ({
  path: '/',
  component: CalculatorLayout,
  indexRoute: StockCorrelation(store),
  childRoutes: [
    StockCorrelationRoute(store),
  ],
});

export default routes;
