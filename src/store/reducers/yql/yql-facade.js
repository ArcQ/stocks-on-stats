import RxJs from 'rxjs';
import YqlRequests from './yql-requests';
import SosApiAdapter from './sos-api-adapter';


export default{
  getStockCorrelation(interval, ...stockSymbols) {
    const dataArr = [];
    stockSymbols.forEach(symbol => {
      YqlRequests.checkSymbol(symbol)
        .then(YqlRequests.getHistoricalData(symbol))
        .then((result) => {
          dataArr.push({
            symbol: symbol,
            interval: {
              start:interval.startDate,
              end:interval.endDate,
            },
            result:result,
          });
        })
        .catch(console.warn('Request failed'));
    })
  },
  getStockCorrlationRx(interval, ...stockSymbols) {
    const dataArr = [];

  }
}


