import rx from 'rx-dom-ajax';

const url = 'http://localhost:3333/test';

function calculateStockCorrelation(arr) {
  rx.DOM.post(
    {
      url,
      body: JSON.stringify({ historicalData: arr }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .subscribe(response => console.log(response));
}

const CalculatorObserver = {
  setNewRequest: (ob) => {
    const arr = [];
    ob.subscribe((data) => {
      arr.push(data);
    },
      () => console.log(),
      () => calculateStockCorrelation(arr));
  },
};

export default CalculatorObserver;
