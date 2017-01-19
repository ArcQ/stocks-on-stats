import { injectReducer } from 'store/modules/root';

export default store => ({
  path: 'risk-of-ruin',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const RiskOfRuin = require('./containers/risk-of-ruin-container.js').default;
      const reducer = require('./modules/risk-of-ruin').default;

      injectReducer(store, { key: 'risk-of-ruin', reducer });
      cb(null, RiskOfRuin);
    }, 'risk-of-ruin');
  },
});
