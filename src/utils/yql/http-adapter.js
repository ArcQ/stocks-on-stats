import * as rx from 'rx-dom-ajax';

export default {
  jsonp: url => rx.DOM.jsonpRequest({
    url,
    jsonp: 'cbfunc',
    jsonpCallback: 'callback',
  }).catch(e => console.warn('error needs to be handled' + e)),
};
