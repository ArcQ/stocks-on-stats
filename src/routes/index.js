import CoreLayout from '../layouts/CoreLayout/CoreLayout';
import Home from './Home';
import CounterRoute from './Counter';

export const routes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    CounterRoute(store),
  ],
});

export default routes;
