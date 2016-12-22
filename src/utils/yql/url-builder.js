const YAHOO_URL = 'http://query.yahooapis.com/v1/public/yql';
const suffixes = {
  DIAGNOSTICS: 'format=json&diagnostics=true&env=http://datatables.org/alltables.env',
  QUERY_ENV: 'env=store://datatables.org/alltableswithkeys',
  FORMAT_CB: 'format=json',
  JSONP_CB: 'callback=cbfunc',
};

/* takes a query string as first argument, followed by any number of suffixes */
function _buildUrl(...strs) {
  strs.push(suffixes.JSONP_CB);
  const newQueryStr = strs.join('&');
  return `${YAHOO_URL}?q=${newQueryStr}`;
}

export default {
  build: {
    diagnosticsUrl: (stockSymbols) => {
      const symbolStr = stockSymbols.join(';');
      const queryStr = `select * from yahoo.finance.quotes where symbol in ("${symbolStr}")`;
      return _buildUrl(queryStr, suffixes.DIAGNOSTICS);
    },
    historicalUrl: (interval, stockSymbol) => {
      const queryStr = `select * from yahoo.finance.historicaldata where symbol = "${stockSymbol}"
      and startDate = "${interval.startDate}" and endDate = "${interval.endDate}"`;
      return _buildUrl(queryStr, suffixes.QUERY_ENV, suffixes.FORMAT_CB, suffixes.JSONP_CB);
    },
  },
};
