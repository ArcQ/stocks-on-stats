import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { getFormattedTimeSpan, getDefaultTimeSpan } from 'utils';

import Http from './http-adapter';
import UrlBuilder from './url-builder';

// check if addtionalAttrs has a special timespan it wants, else add one year
function getTimeSpanObj(additionalAttrs) {
  const getFormattedDefaultTimeSpan = () =>
    getFormattedTimeSpan(getDefaultTimeSpan());

  const checkHasTimeSpan = obj =>
    obj
      && obj.timeSpan
      && obj.timeSpan.startDate
      && obj.timeSpan.endDate;

  return checkHasTimeSpan(additionalAttrs) ? additionalAttrs : getFormattedDefaultTimeSpan();
}

export default {
  checkSymbols: (...stockSymbols) => {
    const url = UrlBuilder.build.diagnosticsUrl(stockSymbols);
    return Http.jsonp(url);
  },
  getHistoricalForStocks: (additionalAttrs, stockSymbols) => {
    const httpArr = stockSymbols.map((stockSymbol) => {
      const obj = {
        stockSymbol,
        url: UrlBuilder.build.historicalUrl(getTimeSpanObj(additionalAttrs), stockSymbol),
      };
      return Http.jsonp(obj.url).map(res => ({
        symbol: obj.stockSymbol,
        data: res.query,
      }));
    });

    return Observable.forkJoin(httpArr);
  },
};
