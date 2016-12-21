import YqlRequests from './yql-requests';
import CalculatorObserver from './calculator-observer';

export default{
  getStockCorrelationRx(interval, ...stockSymbols) {
    CalculatorObserver.setNewRequest(
      YqlRequests
      .checkSymbols(stockSymbols)
      .flatMap(YqlRequests.getHistoricalForStocks(interval, stockSymbols)),
    );
  },
};
