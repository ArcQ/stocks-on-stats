import { injectReducer } from 'store/modules/root';

export default store => ({
  path: 'limit-order-success',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const LimitOrderSuccess = require('./containers/limit-order-success-container.js').default;
      const reducer = require('./modules/limit-order-success').default;

      injectReducer(store, { key: 'limitOrderSuccess', reducer });
      cb(null, LimitOrderSuccess);
    }, 'limit-order-success');
  },
});
