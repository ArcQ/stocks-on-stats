import YqlRequests from './yql-requests';

export default{
  getStockCorrelation(interval, ...stockSymbols) {
    const dataArr = [];
    stockSymbols.forEach(symbol => {
      YqlRequests.checkSymbol(symbol)
        .then(YqlRequests.getHistoricalData(symbol))
        .then((result) => {
          dataArr.push({
            symbol,
            interval: {
              start: interval.startDate,
              end: interval.endDate,
            },
            result,
          });
        })
        .catch(console.warn('Request failed'));
    }),
  },
  getStockCorrlationRx(interval, ...stockSymbols) {
    const dataArr = [];

  }
}


