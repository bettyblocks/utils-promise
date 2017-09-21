// @flow

const getPromiseSettler = (resolve, reject) => (error, result) => {
  if (error) {
    reject(error);
  } else {
    resolve(result);
  }
};

const getLastArg = (fn, args) => args[fn.length - 1];

/**
 * Returns a new function that:
 * - if last argument is a callback =>
 *   it will mimic the function given.
 * - if last argument is not a callback =>
 *   it will return a promise which will be resolved or rejected following the
 *   execution of the function given.
 */
const promisifyFunction = <Args: *, Result>(fn: (...args: Args) => Result) => (
  ...args: Args
): Result | Promise<Result> =>
  typeof getLastArg(fn, args) === "function"
    ? fn(...args)
    : new Promise((resolve, reject) =>
        fn(...args.concat(getPromiseSettler(resolve, reject)))
      );

export default promisifyFunction;
