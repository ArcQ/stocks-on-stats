import { Observable } from 'rxjs';
import Http from './http-adapter';
import UrlBuilder from './url-builder';


export default {
  checkSymbols: (...stockSymbols) => {
    const url = UrlBuilder.build.diagnosticsUrl(stockSymbols);
    return Http.jsonp(url);
  },
  getHistoricalForStocks: (interval, stockSymbols) => (
    Observable
    .from(stockSymbols)
    .map(stockSymbol =>
      ({
        stockSymbol,
        url: UrlBuilder.build.historicalUrl(interval, stockSymbol),
      }),
    )
    .concatMap(obj =>
      Http.jsonp(obj.url).map(res => ({
        stockSymbol: obj.stockSymbol,
        interval,
        quotes: res.response.query.results.quote,
      })),
    )
  ),
};
