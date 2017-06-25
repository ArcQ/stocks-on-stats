import fetch from 'whatwg-fetch';

const YAHOO_URL = 'http://query.yahooapis.com/v1/public/yql';
const suffixes = {
  DIAGNOSTICS: 'format=json&diagnostics=true&env=http://datatables.org/alltables.env',
  QUERY_ENV: 'env=store://datatables.org/alltableswithkeys',
  FORMAT_CB: 'format=json&callback=?',
};

/* takes a query string as first argument, followed by any number of suffixes */

function buildUrl(...strs) {
  const newQueryStr = encodeURIComponent(strs.join('&'));
  return `${YAHOO_URL}?q=${newQueryStr}`;
}

function checkSymbol(symbol) {
  const queryStr = `select * from yahoo.finance.quotes where symbol in ("${symbol}")`;
  const url = buildUrl(queryStr, suffixes.DIAGNOSTICS);
  fetch(url);
}

export default {
  getHistoricalData: () =>
  fetch('/users.html'),
};
