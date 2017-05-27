import CoreContainer from '../containers/core-container';
import Home from './home';
// TODO possible to generate these instead of manually creating new ones
import StockCorrelationRoute from './stock-correlation';
import LimitOrderSuccessRoute from './limit-order-success';
import RiskOfRuinRoute from './risk-of-ruin';

export const routes = store => ({
  path: '/calculators',
  component: CoreContainer,
  indexRoute: Home,
  childRoutes: [
    StockCorrelationRoute(store),
    LimitOrderSuccessRoute(store),
    RiskOfRuinRoute(store),
  ],
});

export default routes;
