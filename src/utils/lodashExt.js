export function multiMap(dict) {
  return arr =>
    Object.keys(dict).reduce((result, key) => {
      result[key] = arr.map((...args) => dict[key](...args));
      return result;
    }, {});
}

export default {};
