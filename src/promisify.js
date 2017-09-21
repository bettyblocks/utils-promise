import _mapValues from "lodash/mapValues";

const getLastArg = (fn, args) => args[fn.length - 1];

const getPromiseSettler = (resolve, reject) => (error, ...results) => {
  if (error) {
    reject(error);
  } else {
    resolve(...results);
  }
};

const promisifyFunction = fn => (...args) =>
  typeof getLastArg(fn, args) === "function"
    ? fn(...args)
    : new Promise((resolve, reject) =>
        fn(...args.concat(getPromiseSettler(resolve, reject)))
      );

const promisifyObject = obj =>
  _mapValues(
    obj,
    value =>
      typeof value === "function"
        ? promisifyFunction(obj[value].bind(obj))
        : value
  );

export {promisifyFunction, promisifyObject};
