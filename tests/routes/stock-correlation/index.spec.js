import StockCorrelationRoute from 'routes/stock-correlation'

describe('(Route) StockCorrelation', () => {
  let _route

  beforeEach(() => {
    _route = StockCorrelationRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `stock-correlation`', () => {
    expect(_route.path).to.equal('stock-correlation')
  })
})
