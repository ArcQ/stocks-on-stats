import { injectReducer } from '../../store/reducers';

export default store => ({
  path: 'stock-correlation',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const StockCorrelation = require('./containers/stock-correlation-container.js').default;
      const reducer = require('./modules/stock-correlation').default;

      injectReducer(store, { key: 'stockCorrelation', reducer });
      cb(null, StockCorrelation);
    }, 'stock-correlation');
  },
});
