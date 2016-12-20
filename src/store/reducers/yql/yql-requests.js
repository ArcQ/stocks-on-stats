import { Observable } from 'rxjs';
import Http from './http-adapter';
import UrlBuilder from './url-builder';

// import {flatMap} from 'lodash';
// let _ = {flatMap};

const YAHOO_URL = 'http://query.yahooapis.com/v1/public/yql';
const suffixes = {
  DIAGNOSTICS: 'format=json&diagnostics=true&env=http://datatables.org/alltables.env',
  QUERY_ENV: 'env=store://datatables.org/alltableswithkeys',
  FORMAT_CB: 'format=json',
  JSONP_CB: 'callback=cbfunc',
};

/* takes a query string as first argument, followed by any number of suffixes */

function _buildUrl(...strs) {
  strs[0] = encodeURIComponent(strs[0]);
  strs.push(suffixes.JSONP_CB);
  const newQueryStr = strs.join('&');
  return `${YAHOO_URL}?q=${newQueryStr}`;
}

function _getHistoricalForStock(symbol) {
  const queryStr = `select * from yahoo.finance.quotes where symbol in ("${symbol}")`;
  const url = _buildUrl(queryStr, suffixes.DIAGNOSTICS);
  return get(url);
}

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
        url: UrlBuilder.build.historicalUrl(interval, stockSymbol)
      })
    )
    .concatMap(obj =>
      Http.jsonp(obj.url).map(res => ({
        stockSymbol: obj.stockSymbol,
        interval,
        quotes: res.response.query.results.quote,
      }))
    )
  )
};
// Observable
// .fromArray(stockSymbols)
// .concatMap(symbol => {
//   console.log(symbol);
//   _checkSymbol(symbol)}),
