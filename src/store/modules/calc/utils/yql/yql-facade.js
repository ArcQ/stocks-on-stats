import YqlRequests from './yql-requests';
import Http from './http-adapter';

// TODO load url from config based on env
const _url = 'http://localhost:5000';

function getHistoricalThenReqCalc(location, additionalAttrs, ...stockSymbols) {
  return YqlRequests
    .checkSymbols(stockSymbols)
    .flatMap(() =>
      YqlRequests.getHistoricalForStocks(additionalAttrs, stockSymbols),
    )
    .flatMap((result) => {
      // const url = `${_url}/calculators/stock-correlation`;
      const url = `${_url}${location.pathname}`;
      // TODO api needs a structure fix, temporarily setting interval
      return Http.post(url, JSON.stringify({ stocks: result, ...additionalAttrs }));
    },
    );
}

export default{
  /* makeCalculation: function
  description: sends request to yql then redirects response to sos api
  {param 1}: takes location to see which calculator methods to use
  {param 2+}: rest of parameters should match the method it is calling eg. getStockCorrelation
  */
  makeCalculation: (location, args) => {
    return getHistoricalThenReqCalc(location, ...args)
  }
};
