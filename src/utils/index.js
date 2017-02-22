import update from 'immutability-helper';

export const START_DATE_KEY = 'startDate';
export const END_DATE_KEY = 'endDate';
const TAB_KEY_CODE = 9;
const RETURN_KEY_CODE = 13;
const SEMI_COLON_KEY_CODE = 186;

export const keyCodesForAdd = [TAB_KEY_CODE, RETURN_KEY_CODE, SEMI_COLON_KEY_CODE];

// takes variable arguments: 1(date) or 3(year,month,day)
export function getFormattedDateStr(...args) {
  const get2DigitNum = (num) => (num<10) ? `0${num}` : num;

  const concatDateStr = (year, month, day) => `${year}-${month}-${day}`;
  return (args.length > 1)
    ? concatDateStr(...args)
    : concatDateStr(get2DigitNum(args[0]).getFullYear(), get2DigitNum(args[0]).getMonth() + 1, get2DigitNum(args[0].getDate()));
}

export function getDateBackByMonths(month = 0) {
  const dt = new Date();
  return new Date(dt.setMonth(dt.getMonth() - month));
}

export function bindFuncsToSelf(...funcNameArr) {
  funcNameArr.forEach((funcName) => {
    this[funcName] = this[funcName].bind(this);
  });
}

export function getDefaultTimeSpan() {
  return {
    [START_DATE_KEY]: getDateBackByMonths(12),
    [END_DATE_KEY]: getDateBackByMonths(),
  };
}

export function getFormattedTimeSpan(timeSpan) {
  return update(timeSpan, {
    [START_DATE_KEY]: { $apply: date => getFormattedDateStr(date) },
    [END_DATE_KEY]: { $apply: date => getFormattedDateStr(date) },
  });
}

export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default {};
