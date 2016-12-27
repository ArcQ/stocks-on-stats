import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/Rx';
import Http from './http-adapter';
import UrlBuilder from './url-builder';


export default {
  checkSymbols: (...stockSymbols) => {
    const url = UrlBuilder.build.diagnosticsUrl(stockSymbols);
    return Http.jsonp(url);
  },
  getHistoricalForStocks: (interval, stockSymbols) => {
    const httpArr = stockSymbols.map((stockSymbol) => {
      const obj = {
        stockSymbol,
        url: UrlBuilder.build.historicalUrl(interval, stockSymbol),
      };
      return Http.jsonp(obj.url).map(res => ({
        symbol: obj.stockSymbol,
        data: res.query,
      }));
    });

    return Observable.forkJoin(httpArr);
  },
};
