import YqlRequests from './yql-requests';
import SosApiAdapter from '../sos-api-adapter';
import { Observable } from 'rxjs/Observable';
import Http from './http-adapter';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/Rx';

const _url = "http://localhost:5000";

function _getStockCorrelation(interval, ...stockSymbols) {
  return YqlRequests
    .checkSymbols(stockSymbols)
    .flatMap(() =>
      YqlRequests.getHistoricalForStocks(interval, stockSymbols)
    )
    .flatMap(result => {
      const url = `${_url}/calculators/stock-correlation`;
      // TODO api needs a structure fix, temporarily setting interval
      interval = 3;
      return Http.post(url, JSON.stringify({ "stocks": result, "interval": interval }));
    }
    )
}

const calculatorDict = {
  'stock-correlation': _getStockCorrelation,
};

export default{
  /* makeCalculation: function
  description: sends request to yql then redirects response to sos api
  {param 1}: takes location to see which calculator methods to use
  {param 2+}: rest of parameters should match the method it is calling eg. getStockCorrelation
  */
  makeCalculation: (location, args) => _getStockCorrelation(...args),
};
