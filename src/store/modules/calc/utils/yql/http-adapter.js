import fetchJsonp from 'fetch-jsonp';
import 'whatwg-fetch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/Rx';
import 'rxjs/add/observable/dom/ajax';

export default {
  jsonp: url => Observable.from(fetchJsonp(url, {
    // TODO to avoid getting blacklisted by yahoo, we need to uncomment this but fix our http-req
    // jsonpCallbackFunction: 'cbfunc',
    jsonpCallback: 'callback',
  }).then(response =>
    response.json()),
  ),
  post: (url, payload) => {
    console.log(payload);
    return Observable.ajax.post(
      url,
      payload,
      {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    );
  },
};
