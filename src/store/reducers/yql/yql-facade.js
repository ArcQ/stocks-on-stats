import YqlRequests from './yql-requests';
import CalculatorObserver from './calculator-observer.js';

export default{
  getStockCorrelationRx(interval, ...stockSymbols) {
    var arr = [];
    CalculatorObserver.setNewRequest(
      YqlRequests
      .checkSymbols(stockSymbols)
      .flatMap(YqlRequests.getHistoricalForStocks(interval, stockSymbols))
    );
  },
};
